import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://moneytransfer-6pii.onrender.com",
    },
  },
  plugins: [react()],
});
