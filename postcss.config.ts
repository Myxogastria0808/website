import type { Root } from "postcss";
import postcssCustomMedia from "postcss-custom-media";

// postcss-custom-media v12 removed importFrom, so @custom-media definitions must be
// present in the same file. This plugin prepends them to any file that uses --bp-*.
const customMediaDefs: Record<string, string> = {
  "--bp-xs-up": "(min-width: 21.875rem)",
  "--bp-xs-down": "(max-width: 21.8125rem)",
  "--bp-sm": "(max-width: 30rem)",
  "--bp-md": "(max-width: 40rem)",
  "--bp-lg": "(max-width: 50rem)",
};

const injectCustomMedia = {
  postcssPlugin: "inject-custom-media",
  Once(root: Root) {
    const src = root.toString();
    if (!src.includes("--bp-")) return;
    // Skip files that already define @custom-media --bp-* (e.g. global.css itself).
    if (src.includes("@custom-media --bp-")) return;
    for (const [name, query] of Object.entries(customMediaDefs).reverse()) {
      root.prepend({ name: "custom-media", params: `${name} ${query}` });
    }
  },
};

export default {
  plugins: [injectCustomMedia, postcssCustomMedia()],
};
