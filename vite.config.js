import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        card: resolve(__dirname, "src/card/index.html"),
        deck: resolve(__dirname, "src/deck/index.html"),
        database: resolve(__dirname, "src/database/index.html"),
      },
    },
  },
});
