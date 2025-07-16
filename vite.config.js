// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this 'server' configuration block
  server: {
    // This is the port your frontend development server runs on
    port: 5173, // Or whatever port Vite is using for your frontend
    proxy: {
      // Proxy requests that start with '/api'
      "/api": {
        // Target your backend server's address and port
        target: "http://localhost:5000", // IMPORTANT: Ensure this matches your backend's port from index.js
        changeOrigin: true, // Needed for virtual hosted sites
        // rewrite: (path) => path.replace(/^\/api/, '/api'), // This line is often not strictly needed if your backend also uses /api prefix
      },
    },
  },
});
