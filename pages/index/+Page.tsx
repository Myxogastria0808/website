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

    // Set canvas size to match its displayed size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize drops with random properties based on the canvas dimensions
    drops.current = Array.from({ length: DROP_COUNT }, () => makeDrop(canvas.width, canvas.height));
    // Sort drops by size to ensure correct drawing order (smaller drops in the background, larger drops in the foreground)
    drops.current.sort((a, b) => a.size - b.size);

    // Get 2D drawing context
    const ctx = canvas.getContext("2d");
    let rafId: number;
    let lastTime = 0;
    const frameInterval = 1000 / TARGET_FPS;

    const draw = (timestamp: number) => {
      if (!ctx) return; // Guard against null context

      // Frame rate control: Only update and redraw if enough time has passed since the last frame to maintain the target FPS.
      if (timestamp - lastTime < frameInterval) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;

      // Step 1: Update positions and reset drops that go off-screen
      let needsSort = false;
      for (const drop of drops.current) {
        drop.y += drop.speed; // Move drop down by its speed
        // If the drop has moved off the bottom of the screen, reset it to the top with new properties
        if (drop.y > canvas.height + drop.size) {
          // Create a new drop with random properties
          const next = makeDrop(canvas.width, canvas.height);
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
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
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

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      // Debounce the resize event to avoid excessive calculations during rapid resizing
      resizeTimer = setTimeout(() => {
        // Set canvas size to match its displayed size after resizing
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        // Reinitialize drops with new canvas dimensions and sort them again
        drops.current = Array.from({ length: DROP_COUNT }, () =>
          makeDrop(canvas.width, canvas.height),
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
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "block",
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

