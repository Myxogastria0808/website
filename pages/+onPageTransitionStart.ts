// https://vike.dev/onPageTransitionStart

import type { PageContextClient } from "vike/types";

export const onPageTransitionStart = async (pageContext: Partial<PageContextClient>) => {
  if (import.meta.env.DEV) {
    console.log("Page transition start");
    console.log("pageContext.isBackwardNavigation", pageContext.isBackwardNavigation);
  }
  document.body.classList.add("page-transition");
};
