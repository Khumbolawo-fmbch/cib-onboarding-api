# Playwright API Tests

This folder contains a minimal Playwright Test scaffold for automated API tests.

Prerequisites

- Node.js (16+ recommended)

Quick start (Windows `cmd.exe`)

```
cd playwright-api-tests
npm install
npx playwright install
npm test
```

Notes

- Default base URL is `https://jsonplaceholder.typicode.com`. Override by setting `API_BASE_URL` environment variable.
- Tests live under `tests/` (example: `tests/api/example.spec.ts`).
