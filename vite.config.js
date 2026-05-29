import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes all asset URLs relative, so the build works on any host
// (Netlify, Vercel, custom domain) and on GitHub Pages project subpaths
// (https://user.github.io/repo/). The app uses hash-based routing, so the
// document path never changes and relative asset paths always resolve.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
