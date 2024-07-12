// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  root: "web",
  server: {
    port: 8000,
  },

  build: {
    outDir: "build",
    emptyOutDir: true,
    rollupOptions: {},
  },
});
