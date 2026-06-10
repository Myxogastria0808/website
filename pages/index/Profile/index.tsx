import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./index.module.css";

export default function Profile() {
  const frameRef = useRef<HTMLDivElement>(null);
  const wedgeRef = useRef<HTMLDivElement>(null);
  const lambdaRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const frame = frameRef.current;
    const wedge = wedgeRef.current;
    const lambda = lambdaRef.current;
    if (!frame || !wedge || !lambda) return;

    const getValues = () => {
      const W = frame.offsetWidth;
      const H = wedge.offsetHeight;
      const d = Math.sqrt(W * W + H * H);
      const lw = lambda.offsetWidth;
      const lh = lambda.offsetHeight;
      // 斜辺に対して垂直距離 lh/2 を保つオフセット
      const size = lh / 2 + (W * lh - H * lw) / (2 * d);
      const ox = -((size * H) / d);
      const oy = -((size * W) / d);
      // 移動方向を斜辺 (-W, H) と平行にするサイズ補正
      const c = (W * lw + H * lh) / (d * d);
      // 回転後のλのy方向半幅（スクリーン座標）
      const halfExtentY = (lw * H + lh * W) / (2 * d);
      // λ上端がy=0より上にはみ出す量 → その分だけ斜辺方向にずらす
      const yMin = lh / 2 + oy - halfExtentY;
      const shift = Math.max(0, -yMin);
      return {
        angle: -Math.atan2(H, W) * (180 / Math.PI),
        oxStart: ox - (shift * W) / H,
        oyStart: oy + shift,
        xEnd: ox - W * (1 - c),
        yEnd: oy + H * (1 - c),
      };
    };

    gsap.fromTo(
      lambda,
      {
        x: () => getValues().oxStart,
        y: () => getValues().oyStart,
        rotation: () => getValues().angle,
      },
      {
        x: () => getValues().xEnd,
        y: () => getValues().yEnd,
        rotation: () => getValues().angle,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      },
    );

    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(frame);
    return () => observer.disconnect();
  });

  return (
    <section>
      <h2 className="section-title">Profile</h2>
      <div ref={frameRef} className={styles.frame}>
        <div className={styles.inverted}>
          <span ref={lambdaRef} className={`${styles.lambda} font-megrim`}>
            Call me
          </span>
          <div className={styles.aside}>
            <img src="/avator.jpeg" alt="icon" className={styles.icon} />
          </div>
        </div>
        <div ref={wedgeRef} className={styles.wedge}>
          <p className={`${styles.name} font-megrim`}>
            Yuki
            <br />
            Osada
          </p>
        </div>
      </div>
    </section>
  );
}
