// https://vike.dev/onPageTransitionStart

import type { PageContextClient } from "vike/types";

export async function onPageTransitionStart(pageContext: Partial<PageContextClient>) {
  if (import.meta.env.DEV) {
    console.log("Page transition start");
    console.log("pageContext.isBackwardNavigation", pageContext.isBackwardNavigation);
  }
  document.body.classList.add("page-transition");
}
