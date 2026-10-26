// @lovable.dev/vite-tanstack-config already includes the required plugins.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/kaikai-hiro-love-clock/",
  },
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: false,
    },
  },
});
