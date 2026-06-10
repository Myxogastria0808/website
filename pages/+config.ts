import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

// Default config (can be overridden by pages)
// https://vike.dev/config

const config: Config = {
  server: true,
  extends: [vikeReact],
  htmlAttributes: { lang: "en" },
};

export default config;
