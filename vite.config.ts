import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), legacy()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
