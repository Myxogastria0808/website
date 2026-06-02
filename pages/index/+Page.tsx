import { useEffect, useRef } from "react";

const MIN_SIZE = 10;
const MAX_SIZE = 50;
const DROP_COUNT = 30;
const TARGET_FPS = 60;
const MIN_SPEED = 1.2; // Speed of the smallest (farthest) drops (px/frame)
const MAX_SPEED = 6; // Speed of the largest (closest) drops (px/frame)

type Drop = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
};

// depth function: Calculates the opacity and speed of a drop based on its size to create a sense of depth.
function depth(size: number): { opacity: number; speed: number } {
  const t = (size - MIN_SIZE) / (MAX_SIZE - MIN_SIZE); // Normalize size to a 0-1 range
  return {
    // Opacity ranges from 0.06 (for smallest drops) to 1.0 (for largest drops), with a non-linear scaling for better visual effect.
    opacity: 0.06 + 0.94 * Math.pow(t, 0.75),
    // Speed ranges from MIN_SPEED (for smallest drops) to MAX_SPEED (for largest drops), with a non-linear scaling to make larger drops fall faster.
    speed: MIN_SPEED + (MAX_SPEED - MIN_SPEED) * Math.pow(t, 0.9),
  };
}

// makeDrop function: Creates a new drop with random properties based on the given width and height of the canvas.
// width/height are in CSS pixels (not DPR-scaled backing store pixels).
function makeDrop(width: number, height: number): Drop {
  const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
  const { opacity, speed } = depth(size);
  return {
    x: Math.random() * width,
    y: -size - Math.random() * height, // Start above the canvas with a random offset to create a staggered entry effect
    size,
    opacity,
    speed,
  };
}

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Get canvas element reference
  const drops = useRef<Drop[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current; // Access the canvas element
    if (!canvas) return; // Guard against null reference

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

    // Initialize drops with random properties based on the canvas dimensions
    // Use CSS pixel dimensions (offsetWidth/Height) so drop coordinates stay in CSS pixel space.
    drops.current = Array.from({ length: DROP_COUNT }, () =>
      makeDrop(canvas.offsetWidth, canvas.offsetHeight),
    );
    // Sort drops by size to ensure correct drawing order (smaller drops in the background, larger drops in the foreground)
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

      // Step 1: Update positions and reset drops that go off-screen
      let needsSort = false;
      for (const drop of drops.current) {
        drop.y += drop.speed * (elapsed / frameInterval); // Scale by elapsed time to keep speed consistent across FPS variation
        // If the drop has moved off the bottom of the screen, reset it to the top with new properties
        if (drop.y > cssH + drop.size) {
          // Create a new drop with random properties
          const next = makeDrop(cssW, cssH);
          // Set the reset drop's properties to the new drop's properties
          drop.x = next.x;
          drop.y = next.y;
          drop.size = next.size;
          drop.opacity = next.opacity;
          drop.speed = next.speed;
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
        ctx.fillStyle = `rgba(0,0,0,${drop.opacity.toFixed(3)})`;
        ctx.fillText("λ", drop.x, drop.y);
      }

      // Request the next animation frame to continue the loop
      rafId = requestAnimationFrame(draw);
    };

    // Start the animation loop
    rafId = requestAnimationFrame(draw);

    let resizeTimer: ReturnType<typeof setTimeout> | undefined = undefined;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      // Debounce the resize event to avoid excessive calculations during rapid resizing
      resizeTimer = setTimeout(() => {
        // Re-apply DPR scale after canvas resize resets the context transform.
        // setCanvasSize() returns the current DPR (may differ if monitor changed).
        const newDpr = setCanvasSize();
        ctx.scale(newDpr, newDpr);
        // Update cached CSS pixel dimensions after resize
        cssW = canvas.offsetWidth;
        cssH = canvas.offsetHeight;
        // Reinitialize drops with new canvas dimensions and sort them again
        drops.current = Array.from({ length: DROP_COUNT }, () =>
          makeDrop(cssW, cssH),
        );
        // Sort drops again to maintain correct drawing order after resizing, as sizes may have changed due to new canvas dimensions
        drops.current.sort((a, b) => a.size - b.size);
      }, 150);
    };
    // Add event listener for window resize to handle canvas resizing and drop reinitialization
    window.addEventListener("resize", handleResize);

    // Cleanup function to stop the animation and remove event listeners when the component unmounts
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <h1>Hello</h1>
      </div>
    </section>
  );
}
