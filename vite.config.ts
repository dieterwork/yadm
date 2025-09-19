import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      $: path.resolve(__dirname, "./src"),
      $features: path.resolve(__dirname, "./src/features"),
      $shared: path.resolve(__dirname, "./src/shared"),
      $assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  plugins: [react(), tailwindcss()],
});
