import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import { dependencies } from "./package.json"; // Adjust the path if necessary

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    federation({
      filename: "remoteEntry.js",
      name: "producer",
      exposes: {
        "./remote-app": "./src/App.tsx",
      },
      remotes: {},
      shared: {
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
      },
    }),
    react(),
  ],
  server: {
    port: 4174,
  },
  build: {
    outDir: "dist",
  },
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
    },
  },
});
