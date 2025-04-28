import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        test: resolve(__dirname, "test.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("bootstrap")) {
              return "vendor-bootstrap";
            }
            if (id.includes("swiper")) {
              return "vendor-swiper";
            }
            if (id.includes("@popperjs/core")) {
              return "vendor-popper";
            }
            return "vendor"; // остальное из node_modules
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
        `,
      },
    },
  },
  server: {
    port: 8080,
  },
});
