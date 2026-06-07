export async function onPageTransitionEnd() {
  if (import.meta.env.DEV) {
    console.log("Page transition end");
  }
  document.body.classList.remove("page-transition");
}
