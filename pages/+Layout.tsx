import { useEffect, useRef } from "react";
import { Footer } from "../components";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "lenis/dist/lenis.css";
import "./global.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  // Lenis and ScrollTrigger integration
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();
    // Update all ScrollTriggers instances on scroll event of Lenis
    lenis.on("scroll", ScrollTrigger.update);
    // Translate the time from seconds to milliseconds
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    // Disable lag smoothing so GSAP doesn't try to "catch up" after a long frame,
    // which would cause ScrollTrigger positions to jump during heavy renders.
    gsap.ticker.lagSmoothing(0);
    // Clean up on unmount
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  // Custom cursor: a dot that snaps instantly + a ring that follows with GSAP lag.
  // Visibility is controlled by two layers:
  //   1. CSS `@media (pointer: fine)` — hides the elements on touch-only devices at the
  //      stylesheet level, so no JS runs at all for phones/tablets.
  //   2. JS hybrid detection below — handles devices that expose BOTH a fine pointer
  //      (trackpad/stylus) AND a touchscreen (e.g. Surface, iPad + keyboard).
  //      On those devices `pointer: fine` matches, so CSS shows the cursor, but we
  //      still want to hide it the moment the user actually touches the glass.
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const clickLabelRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    // Bail out entirely on touch-only devices (`pointer: coarse`).
    // Without this class the CSS never hides the native cursor, so non-JS / coarse
    // pointer devices retain normal browser behaviour.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // Respect the OS-level preference; skip animated cursor for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.body.classList.add("has-custom-cursor");

    gsap.set(ring, { xPercent: -50, yPercent: -50 });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      // Resetting inline `display` and `cursor` to "" (empty string) hands control
      // back to the stylesheet — `@media (pointer: fine)` restores `display: block`
      // and `cursor: none` automatically. This avoids hardcoding values in JS.
      document.body.classList.add("has-custom-cursor");
      dot.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      ringX(e.clientX);
      ringY(e.clientY);

      // Detect whether the element under the cursor is interactive.
      // We cannot use `getComputedStyle(target).cursor` because `* { cursor: none !important }`
      // always returns "none". Instead, we read the CSS custom property `--is-pointer`
      // which is set on interactive elements in global.css and is unaffected by the
      // cursor override. `getComputedStyle` resolves inheritance, so a <span> inside
      // an <a> correctly inherits `--is-pointer: 1` from its ancestor.
      const target = e.target instanceof Element ? e.target : null;
      const isPointer = target
        ? window.getComputedStyle(target).getPropertyValue("--is-pointer").trim() === "1"
        : false;
      dot.classList.toggle("cursor-dot--pointer", isPointer);
      ring.classList.toggle("cursor-ring--pointer", isPointer);
      if (clickLabelRef.current) {
        clickLabelRef.current.classList.toggle("cursor-click-label--visible", isPointer);
      }
    };

    const onTouch = () => {
      // A touch event means the user switched from mouse/stylus to finger.
      // Override the CSS with inline styles so the cursor disappears immediately,
      // regardless of what the media query says.
      document.body.classList.remove("has-custom-cursor");
      if (clickLabelRef.current)
        clickLabelRef.current.classList.remove("cursor-click-label--visible");
    };

    window.addEventListener("mousemove", onMove);
    // `passive: true` — we never call preventDefault() in onTouch, so marking it
    // passive lets the browser skip the wait and start scrolling immediately.
    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
    };
  });

  return (
    <div className="layout">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={clickLabelRef} className="cursor-click-label">
          Click!
        </span>
      </div>
      <div className="layout-content">{children}</div>
      <Footer />
    </div>
  );
}
