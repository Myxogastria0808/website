import { useEffect, useRef } from "react";
import gsap from "gsap";

const FONT_SIZE = 20;
const COL_WIDTH = 38;
const TARGET_FPS = 30;

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drops = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const initDrops = () => {
      const cols = Math.floor(canvas.width / COL_WIDTH);
      // Spread drops randomly across the full height so the animation starts mid-rain
      drops.current = Array.from({ length: cols }, () =>
        Math.floor(Math.random() * (canvas.height / FONT_SIZE))
      );
    };
    initDrops();

    const ctx = canvas.getContext("2d");

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.fillStyle = "#000";

      for (let i = 0; i < drops.current.length; i++) {
        const y = drops.current[i] * FONT_SIZE;
        ctx.fillText("λ", i * COL_WIDTH, y);
        drops.current[i]++;
        // Reset to a random position above the screen to re-enter
        if (drops.current[i] * FONT_SIZE > canvas.height) {
          drops.current[i] = -Math.floor(Math.random() * 30 + 5);
        }
      }
    };

    let lastTime = 0;
    const frameInterval = 1000 / TARGET_FPS;
    const tick = (time: number) => {
      if (time * 1000 - lastTime < frameInterval) return;
      lastTime = time * 1000;
      draw();
    };
    gsap.ticker.add(tick);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        initDrops();
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(tick);
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
