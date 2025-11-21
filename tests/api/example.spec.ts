import { test, expect } from "@playwright/test";

test("test api request", async ({ request }) => {
  const response = await request.get("/posts/1");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body).toHaveProperty("title");
});
