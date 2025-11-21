// tests for the account types API
import {
  test,
  expect,
  request as playwrightRequest,
  APIRequestContext,
} from "@playwright/test";
import { generateToken } from "./helpers/generate-token";

test("create, retrieve, update, and delete an account type", async ({}) => {
  const apiRequestContext = await playwrightRequest.newContext({
    ignoreHTTPSErrors: true,
    baseURL: process.env.API_BASE_URL,
  });
  // Generate authentication token
  const token = await generateToken(apiRequestContext);

  // Create an account type
  const response = await apiRequestContext.post("/api/account-type", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name: "Savings Account",
      image: "",
      description: "A savings account type",
    },
  });
});

test("confirm account type entity group mapping", async ({}) => {
  const apiRequestContext = await playwrightRequest.newContext({
    ignoreHTTPSErrors: true,
    baseURL: process.env.API_BASE_URL,
  });
  // Generate authentication token
  const token = await generateToken(apiRequestContext);

  // Check limited companies entity group mapping
  const response = await apiRequestContext.get(
    "/api/v1/cib-onboarding/account_type/company-types/1",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const responseData = await response.json();

  // top-level company type names
  const companyNames = responseData.map((c: any) => c.name);
  expect(companyNames).toEqual(
    expect.arrayContaining([
      "PRIVATE LIMITED COMPANY",
      "PUBLIC LIMITED COMPANY",
    ])
  );

  // PRIVATE LIMITED COMPANY -> entity_groups
  const privateLtd = responseData.find(
    (c: any) => c.name === "PRIVATE LIMITED COMPANY"
  );
  expect(privateLtd).toBeTruthy();
  const privateEntityNames = (privateLtd.entity_groups || []).map(
    (g: any) => g.name
  );
  expect(privateEntityNames).toEqual(
    expect.arrayContaining([
      "LIMITED BY GUARANTEE",
      "PRIVATE LIMITED COMPANY",
      "SINGLE MEMBER COMPANY",
      "LIMITED LIABILITY COMPANY (LLC)",
      "MULTINATIONAL CORPORATION  (MNC)",
    ])
  );

  // PUBLIC LIMITED COMPANY -> entity_groups
  const publicLtd = responseData.find(
    (c: any) => c.name === "PUBLIC LIMITED COMPANY"
  );
  expect(publicLtd).toBeTruthy();
  const publicEntityNames = (publicLtd.entity_groups || []).map(
    (g: any) => g.name
  );
  expect(publicEntityNames).toEqual(
    expect.arrayContaining([
      "PUBLIC LIMITED ENTITY - LISTED",
      "PUBLIC LIMITED ENTITY - NON LISTED",
      "MULTINATIONAL CORPORATION  (MNC)",
    ])
  );
});
