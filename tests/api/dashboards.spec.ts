// tests for the dashboard API
import { test, expect, request as playwrightRequest } from "@playwright/test";
import { generateToken } from "./helpers/generate-token";

test.describe("Dashboard API", async () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    // Generate authentication token before all tests
    token = await generateToken(request);
  });

  test("get list of dashboards", async ({ request, baseURL }) => {
    // Make authenticated request to get dashboards
    const response = await request.get(
      `${baseURL}api/v1/cib-onboarding/dashboard/stats/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toBeTruthy();

    // top-level keys
    const expectedKeys = [
      "all_statuses",
      "user_statuses",
      "account_summary",
      "opened_accounts",
    ];
    for (const key of expectedKeys) {
      expect(body).toHaveProperty(key);
    }
  });
});
