// tests for the currency API
import { test, expect, request as playwrightRequest } from "@playwright/test";
import { generateToken } from "./helpers/generate-token";
import { request } from "https";

test.describe("Currency API", () => {
  test("get list of currencies", async ({ request, baseURL }) => {
    // Generate authentication token
    const token = await generateToken(request);

    // Make authenticated request to get currencies
    const response = await request.get(
      `${baseURL}api/v1/cib-onboarding/currency/get/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(response.ok()).toBeTruthy();

    const currencies = await response.json();
    expect(Array.isArray(currencies)).toBe(true);
    expect(currencies.length).toBeGreaterThan(0);
  });

  //   create new currency
  test("create new currency", async ({ request, baseURL }) => {
    const token = await generateToken(request);
    const newCurrency = {
      name: "Test Currency",
      short_hand: "TC1",
      symbol: "T$",
    };

    const response = await request.post(
      `${baseURL}api/v1/cib-onboarding/currency/add/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: newCurrency,
      }
    );
    expect(response.ok()).toBeTruthy();

    const createdCurrency = await response.json();
    expect(createdCurrency).toMatchObject(newCurrency);
    const createdCurrencyId = createdCurrency.id;
    console.log(`Created currency with ID: ${createdCurrencyId}`);
    return createdCurrencyId;
  });

  //   update previously created currency
});
