import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://test2-4dfe.onrender.com",
    },
  },
  plugins: [react()],
});
