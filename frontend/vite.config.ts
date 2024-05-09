import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //     key: "./key.pem",
    //     cert: "./cert.crt",
    // },
    host: true,
    port: 8000,
    watch: {
      usePolling: true,
    },
  },
});
