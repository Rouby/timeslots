import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig((cfg) => ({
  plugins: [react()],
  base: process.env.BASE,
}));
