import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "maskable_icon.png"],
  manifest: {
    short_name: "Kz iPod",
    name: "Kz iPod Classic",
    description: "Reproductor personalizado con máscara de iPod Classic",
    icons: [
      {
        src: "./maskable_icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "Maskable",
      },
      {
        src: "./logo192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "./logo256.png",
        type: "image/png",
        sizes: "256x256",
      },
      {
        src: "./logo384.png",
        type: "image/png",
        sizes: "384x384",
      },
      {
        src: "./logo512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    start_url: "/",
    scope: "/",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
