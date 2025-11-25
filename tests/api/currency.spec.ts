// tests for the currency API
import { test, expect, request as playwrightRequest } from "@playwright/test";
import { generateToken } from "./helpers/generate-token";

test.describe.serial("Currency API", async () => {
  let token: string;
  let createdCurrencyId: number;
  let createdCurrency: any;

  test.beforeAll(async ({ request, baseURL }) => {
    // Generate authentication token before all tests
    token = await generateToken(request);

    // create currency for all tests

    // generate unique suffix
    const suffix = Date.now(); // or: require('crypto').randomUUID()
    const newCurrency = {
      name: `Test Currency ${suffix}`,
      short_hand: `TC${String(suffix).slice(-4)}`,
      symbol: `T${String(suffix).slice(-2)}`,
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

    createdCurrency = await response.json();
    expect(createdCurrency).toMatchObject(newCurrency);
    createdCurrencyId = createdCurrency.id;
    console.log(`Created currency with ID: ${createdCurrencyId}`);
    return createdCurrency;
  });

  test("get list of currencies", async ({ request, baseURL }) => {
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

    const found = currencies.find(
      (c: any) =>
        String(c.id) === String(createdCurrencyId) ||
        c.name === createdCurrency.name
    );
    expect(found).toBeTruthy();

    // `currencies` is an array; don't use toHaveProperty with an index string.
    expect(Array.isArray(currencies)).toBe(true);
    expect(currencies.length).toBeGreaterThan(0);
  });

  //   update previously created currency
});
