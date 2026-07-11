import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "mfeProducts",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductList": "./src/ProductList.jsx",
        "./ProductDetail": "./src/ProductDetail.jsx",
      },
      remotes: {
        shell: "http://localhost:5004/assets/remoteEntry.js",
        mfeShareUi: "http://localhost:5005/assets/remoteEntry.js",
      },
      shared: [
        "react",
        "react-dom",
        "react-redux",
        "react-router-dom",
        "@reduxjs/toolkit",
        "axios",
      ],
    }),
  ],
  server: {
    port: "5001",
    cors: true,
  },
  preview: { port: 5001, cors: true },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
