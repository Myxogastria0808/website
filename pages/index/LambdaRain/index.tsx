import { useEffect, useRef } from "react";
import styles from "./index.module.css";

const MIN_SIZE = 8; // Minimum size of a drop (farthest drops)
const MAX_SIZE = 44; // Maximum size of a drop (closest drops)
const DROP_COUNT = 30; // Total number of drops to animate
const TARGET_FPS = 60; // Target frames per second for the animation
const MIN_SPEED = 0.4; // Speed of the smallest (farthest) drops (px/frame) — slow for gentle rain feel
const MAX_SPEED = 2.2; // Speed of the largest (closest) drops (px/frame)

// Background color — warm off-white
const BG = "247, 245, 242";
// Ink colors (RGB strings) used for both drops and their ripples
const INK_DEFAULT = "18, 16, 14"; // warm near-black
const INK_ACCENT = "140, 180, 206"; // prussian blue accent (~10% of drops)

type Drop = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  groundY: number; // y position where the drop hits the ground and resets
  // Small (far) drops have a lower groundY — they disappear earlier due to perspective.
  // Large (near) drops reach the full bottom of the screen.
  ink: string; // RGB string — shared with the ripple this drop spawns
};

type Ripple = {
  x: number;
  y: number; // always at the drop's groundY
  r: number; // current radius (grows over time)
  alpha: number; // current opacity (fades over time)
  expandSpeed: number; // px/frame — larger for near drops, smaller for far drops
  ink: string; // RGB string — matches the drop that spawned this ripple
};

// depth function: Calculates the opacity, speed and groundFraction of a drop based on its size.
// groundFraction is the fraction of canvas height where the drop hits the ground.
//   t=0 (smallest/farthest): groundFraction=0.68 — disappears at 68% screen height
//   t=1 (largest/nearest):   groundFraction=1.00 — falls all the way to the bottom
const depth = (size: number): { opacity: number; speed: number; groundFraction: number } => {
  const t = (size - MIN_SIZE) / (MAX_SIZE - MIN_SIZE); // Normalize size to a 0-1 range
  return {
    // Opacity ranges from 0.06 (for smallest drops) to 1.0 (for largest drops), with a non-linear scaling for better visual effect.
    opacity: 0.06 + 0.94 * Math.pow(t, 0.75),
    // Speed ranges from MIN_SPEED (for smallest drops) to MAX_SPEED (for largest drops), with a non-linear scaling to make larger drops fall faster.
    speed: MIN_SPEED + (MAX_SPEED - MIN_SPEED) * Math.pow(t, 0.9),
    // Ground position: far drops dissolve before the bottom, near drops reach the floor.
    groundFraction: 0.78 + 0.15 * t,
  };
};

// makeDrop function: Creates a new drop with random properties based on the given width and height of the canvas.
// width/height are in CSS pixels (not DPR-scaled backing store pixels).
// warm=true places the drop at a random y within the visible canvas (warm start on first render).
const makeDrop = (width: number, height: number, warm = false): Drop => {
  const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
  const { opacity, speed, groundFraction } = depth(size);
  const groundY = height * groundFraction;
  return {
    x: Math.random() * width,
    y: warm ? Math.random() * groundY : -size - Math.random() * height * 0.3,
    size,
    opacity,
    speed,
    groundY,
    ink: Math.random() < 0.1 ? INK_ACCENT : INK_DEFAULT,
  };
};

const LambdaRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Get canvas element reference
  const drops = useRef<Drop[]>([]);
  const ripples = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current; // Access the canvas element
    if (!canvas) return; // Guard against null reference

    // Skip animation entirely for users who prefer reduced motion.
    // The hero header is still rendered; only the canvas loop is omitted.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Scale the backing store by DPR to avoid blur on high-DPI screens.
    // CSS size (offsetWidth/Height) stays unchanged; only the internal resolution is multiplied.
    // DPR is read inside the function so it picks up the current value on every resize
    // (e.g. when moving the window between monitors or changing zoom level).
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(canvas.offsetWidth * dpr);
      canvas.height = Math.round(canvas.offsetHeight * dpr);
      return dpr;
    };
    const dpr = setCanvasSize();

    // Warm-start: place drops throughout the visible canvas so rain is visible immediately.
    drops.current = Array.from({ length: DROP_COUNT }, () =>
      makeDrop(canvas.offsetWidth, canvas.offsetHeight, true),
    );
    drops.current.sort((a, b) => a.size - b.size);

    // Get 2D drawing context
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Guard against null context

    // Scale the context by DPR once so all draw calls can use CSS pixel coordinates.
    // Resetting canvas.width/height (on resize) clears this transform, so it must be re-applied then too.
    ctx.scale(dpr, dpr);

    let rafId: number;
    // -1 is a sentinel meaning "not yet initialized".
    // Initializing to 0 would make the first few frames be skipped (timestamp >> 0),
    // then the first update would use an artificially large delta and cause a visible jump.
    let lastTime = -1;
    const frameInterval = 1000 / TARGET_FPS;

    // Cache CSS pixel dimensions to avoid layout reads (offsetWidth/Height) inside the draw loop.
    // Updated in handleResize whenever the canvas actually changes size.
    let cssW = canvas.offsetWidth;
    let cssH = canvas.offsetHeight;

    // Build the atmosphere gradient drawn over the lambdas each frame.
    // Top: fades to background color so lambdas seem to emerge from air (not hard-edged at top).
    // Bottom: very gentle shadow suggesting ground without being literal.
    // Must be recreated on resize since gradient coordinates are in CSS pixel space.
    const buildFog = () => {
      const grad = ctx.createLinearGradient(0, 0, 0, cssH);
      grad.addColorStop(0, `rgba(${BG}, 0.92)`); // sky — lambdas fade in as they descend
      grad.addColorStop(0.2, `rgba(${BG}, 0.1)`); // almost clear
      grad.addColorStop(0.7, `rgba(${BG}, 0)`); // fully clear
      grad.addColorStop(1, `rgba(${BG}, 0.35)`); // subtle ground shadow
      return grad;
    };
    let fogGradient = buildFog();

    const draw = (timestamp: number) => {
      // Initialize lastTime from the very first RAF timestamp to avoid a large initial delta.
      if (lastTime < 0) {
        lastTime = timestamp;
        rafId = requestAnimationFrame(draw);
        return;
      }

      // Frame rate control: Only update and redraw if enough time has passed since the last frame to maintain the target FPS.
      if (timestamp - lastTime < frameInterval) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      // Cap elapsed time to 3 frames to prevent drops from teleporting after tab is hidden/resumed.
      const elapsed = Math.min(timestamp - lastTime, frameInterval * 3);
      lastTime = timestamp;

      // Step 1: Update positions and reset drops that reach their ground level
      let needsSort = false;
      for (const drop of drops.current) {
        drop.y += drop.speed * (elapsed / frameInterval); // Scale by elapsed time to keep speed consistent across FPS variation
        // If the drop has moved off the bottom of the screen, reset it to the top with new properties
        if (drop.y > drop.groundY) {
          // Spawn a ripple at the impact point before resetting the drop
          const t = (drop.size - MIN_SIZE) / (MAX_SIZE - MIN_SIZE);
          ripples.current.push({
            x: drop.x + drop.size * 0.3, // approximate horizontal center of the λ glyph
            y: drop.groundY,
            r: 0,
            // Opacity and expansion scale with depth: near drops make bigger, more visible ripples
            alpha: 0.12 + 0.3 * t,
            expandSpeed: 0.8 + 2.2 * t,
            ink: drop.ink, // ripple inherits the drop's color
          });

          // Create a new drop with random properties
          const next = makeDrop(cssW, cssH);
          // Set the reset drop's properties to the new drop's properties
          drop.x = next.x;
          drop.y = next.y;
          drop.size = next.size;
          drop.opacity = next.opacity;
          drop.speed = next.speed;
          drop.groundY = next.groundY;
          drop.ink = next.ink;
          needsSort = true;
        }
      }

      // Step 2: If any drops were reset, we need to re-sort to maintain correct drawing order
      // Why sorting is needed: When a drop is reset, it can have a different size, which affects its depth.
      //   Large object (closer object) → Draw after smaller object →  Visible in the foreground
      //   Small object (farther object) → Draw before larger object → Visible in the background
      if (needsSort) drops.current.sort((a, b) => a.size - b.size);

      // Step 3: Clear the canvas and redraw all drops in sorted order
      ctx.clearRect(0, 0, cssW, cssH); // Clear the entire canvas
      for (const drop of drops.current) {
        // Set font size based on drop size and use monospace for consistent character width
        ctx.font = `${drop.size}px monospace`;
        ctx.fillStyle = `rgba(${drop.ink},${drop.opacity.toFixed(3)})`;
        ctx.fillText("λ", drop.x, drop.y);
      }

      // Step 4: Draw and update ripples (expand + fade)
      // Drawn before the fog overlay so the atmosphere gradient naturally softens ground-level ripples.
      const alive: Ripple[] = [];
      for (const rip of ripples.current) {
        if (rip.alpha < 0.005) continue; // Skip fully faded ripples
        ctx.beginPath();
        // Flattened ellipse to suggest the ripple is spreading on a horizontal surface (perspective)
        ctx.ellipse(rip.x, rip.y, rip.r, rip.r * 0.18, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rip.ink},${rip.alpha.toFixed(3)})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
        rip.r += rip.expandSpeed * (elapsed / frameInterval);
        rip.alpha *= 0.92;
        alive.push(rip);
      }
      ripples.current = alive;

      // Step 5: Overlay atmosphere gradient — lambdas emerge from sky, dissolve into ground
      ctx.fillStyle = fogGradient;
      ctx.fillRect(0, 0, cssW, cssH);

      // Request the next animation frame to continue the loop
      rafId = requestAnimationFrame(draw);
    };

    // Start the animation loop
    rafId = requestAnimationFrame(draw);

    const handleResize = () => {
      // Re-apply DPR scale after canvas resize resets the context transform.
      // setCanvasSize() returns the current DPR (may differ if monitor changed).
      const newDpr = setCanvasSize();
      ctx.scale(newDpr, newDpr);
      // Update cached CSS pixel dimensions after resize
      cssW = canvas.offsetWidth;
      cssH = canvas.offsetHeight;
      // Rebuild fog gradient for new canvas dimensions
      fogGradient = buildFog();
      ripples.current = [];
      drops.current = Array.from({ length: DROP_COUNT }, () => makeDrop(cssW, cssH, true));
      drops.current.sort((a, b) => a.size - b.size);
    };
    // Add event listener for window resize to handle canvas resizing and drop reinitialization
    window.addEventListener("resize", handleResize);

    // Cleanup function to stop the animation and remove event listeners when the component unmounts
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.hero}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={styles.canvas}
      />
      <div className={styles.overlay}>
        <div className={styles.textBlock}>
          <h1 className="title">Hello, unknown observer...</h1>
          <p aria-hidden="true" className="subtitle">Hello, unknown observer...</p>
        </div>
      </div>
    </header>
  );
};

export default LambdaRain;

