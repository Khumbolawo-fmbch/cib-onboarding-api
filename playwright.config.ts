import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 30_000,
  use: {
    // Set a default base URL for API tests; override with API_BASE_URL env var
    baseURL: process.env.API_BASE_URL || "https://mwul-dtd-app1.fmbch.com:89/",
    extraHTTPHeaders: { Accept: "application/json" },
  },
  projects: [{ name: "api" }],
});
