import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";



export default defineConfig(({ }) => ({
  plugins: [
    react(),
  ],
  server: {
    allowedHosts: true,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
