// ref: https://vike.dev/onPageTransitionStart

import gsap from "gsap";
import type { PageContextClient } from "vike/types";

export const onPageTransitionStart = async (_pageContext: Partial<PageContextClient>) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  await gsap.to("main.layout-content", {
    opacity: 0,
    y: -8,
    duration: 0.3,
    ease: "power2.in",
  });
};
