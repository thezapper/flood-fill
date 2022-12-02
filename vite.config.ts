import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {port:80},
    root: "./src",
    publicDir: "../public",
    build: {
      outDir: "../public"
    }
});