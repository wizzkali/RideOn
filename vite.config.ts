import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Force Nitro to build for Vercel (emits the serverless function + .vercel/output).
  // Without this the lovable preset skips Nitro outside its sandbox -> 404 on Vercel.
  nitro: { preset: "vercel" },
});
