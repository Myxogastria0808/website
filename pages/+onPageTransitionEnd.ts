// ref: https://vike.dev/onPageTransitionStart

import gsap from "gsap";

export const onPageTransitionEnd = () => {
  // Skip animation if the user has requested reduced motion in their OS settings.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.fromTo(
    "main.layout-content",
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
  );
};
