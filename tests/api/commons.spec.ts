// tests for the account types API
import { test, expect, request as playwrightRequest } from "@playwright/test";
import { generateToken } from "./helpers/generate-token";

test.describe("commons API", () => {
  test("check MRA integration status", async () => {
    const apiRequestContext = await playwrightRequest.newContext({
      ignoreHTTPSErrors: true,
      baseURL: process.env.API_BASE_URL,
    });
    // Generate authentication token
    const token = await generateToken(apiRequestContext);
    const response = await apiRequestContext.post(
      "/api/v1/cib-onboarding/commons/verify-tin/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          tin: "71018503",
        },
      }
    );
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty("TaxpayerName");
    expect(body).toHaveProperty("TPIN");
    expect(body).toHaveProperty("BusinessRegistrationNumber");
  });
});
