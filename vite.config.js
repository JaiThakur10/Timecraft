import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react-icons", "react-calendar-heatmap"], // Ensures Rollup treats these as external
    },
  },
  ssr: {
    noExternal: ["react-calendar-heatmap"], // Ensures proper handling during SSR
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
