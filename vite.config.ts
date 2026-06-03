import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api/register": {
        target: "https://slruck3a27.execute-api.ap-south-1.amazonaws.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/register/, "/prod/register"),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
