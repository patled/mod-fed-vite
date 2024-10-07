import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dependencies } from "../package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: "consumer",
      remotes: {
        remote: {
          type: "module",
          name: "producer",
          entry: "http://localhost:4174/remoteEntry.js",
          entryGlobalName: "producer",
          shareScope: "default",
        },
      },
      exposes: {},
      filename: "remoteEntry.js",
      shared: {
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
      },
    }),
    react(),
  ],
});
