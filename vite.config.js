/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "@rollup/plugin-eslint";
const path = require("path");

export default defineConfig({
  plugins: [
    react(),
    {
      ...eslint(),
      enforce: "pre",
      apply: "build",
    },
  ],
  resolve: {
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
      {
        find: "Sandbox",
        replacement: path.resolve(__dirname, "/src/Sandbox"),
      },
    ],
  },
});
