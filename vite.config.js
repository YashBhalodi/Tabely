import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// eslint-disable-next-line no-undef
const path = require("path");

export default defineConfig({
  plugins: [react()],
  resolve: {
    // eslint-disable-next-line no-undef
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "/src") },
      {
        find: "Components",
        replacement: path.resolve(__dirname, "/src/Components"),
      },
      {
        find: "Atoms",
        replacement: path.resolve(__dirname, "/src/Atoms"),
      },
      {
        find: "Routes",
        replacement: path.resolve(__dirname, "/src/Routes"),
      },
      {
        find: "Utils",
        replacement: path.resolve(__dirname, "/src/Utils"),
      },
      {
        find: "Hooks",
        replacement: path.resolve(__dirname, "/src/Hooks"),
      },
    ],
  },
});
