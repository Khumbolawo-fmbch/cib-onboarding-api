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

test("confirm account type entity group mapping - limited companies", async ({}) => {
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

test("confirm account type entity group mapping - non profit organizations", async ({}) => {
  const apiRequestContext = await playwrightRequest.newContext({
    ignoreHTTPSErrors: true,
    baseURL: process.env.API_BASE_URL,
  });
  // Generate authentication token
  const token = await generateToken(apiRequestContext);

  // Check non profit organizations entity group mapping
  const response = await apiRequestContext.get(
    "/api/v1/cib-onboarding/account_type/company-types/2",
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
      "TRUST",
      "CHARITY",
      "ASSOCIATION",
      "SOCIETY",
      "CLUB",
      "NGO",
      "GLOBAL DEVELOPMENT ORGANISATION (GDO)",
    ])
  );

  // TRUST -> entity_groups
  const trust = responseData.find((c: any) => c.name === "TRUST");
  expect(trust).toBeTruthy();
  const trustEntityNames = (trust.entity_groups || []).map((g: any) => g.name);
  expect(trustEntityNames).toEqual(
    expect.arrayContaining([
      "TRUST ORGANISATION",
      "OTHER TRUSTS (CLUBS, SOCIAL OR COMMUNITY TRUST ORGANISATION)",
    ])
  );

  // CHARITY -> entity_groups
  const charity = responseData.find((c: any) => c.name === "CHARITY");
  expect(charity).toBeTruthy();
  const charityEntityNames = (charity.entity_groups || []).map(
    (g: any) => g.name
  );
  expect(charityEntityNames).toEqual(
    expect.arrayContaining(["CHARITABLE ORGANISATION"])
  );

  // ASSOCIATION -> entity_groups
  const association = responseData.find((c: any) => c.name === "ASSOCIATION");
  expect(association).toBeTruthy();
  const associationEntityNames = (association.entity_groups || []).map(
    (g: any) => g.name
  );
  expect(associationEntityNames).toEqual(
    expect.arrayContaining(["ASSOCIATION"])
  );

  // SOCIETY -> entity_groups
  const society = responseData.find((c: any) => c.name === "SOCIETY");
  expect(society).toBeTruthy();
  const societyEntityNames = (society.entity_groups || []).map(
    (g: any) => g.name
  );
  expect(societyEntityNames).toEqual(expect.arrayContaining(["SOCIETY"]));

  // CLUB -> entity_groups
  const club = responseData.find((c: any) => c.name === "CLUB");
  expect(club).toBeTruthy();
  const clubEntityNames = (club.entity_groups || []).map((g: any) => g.name);
  expect(clubEntityNames).toEqual(expect.arrayContaining(["CLUB"]));

  // NGO -> entity_groups
  const ngo = responseData.find((c: any) => c.name === "NGO");
  expect(ngo).toBeTruthy();
  const ngoEntityNames = (ngo.entity_groups || []).map((g: any) => g.name);
  expect(ngoEntityNames).toEqual(expect.arrayContaining(["NGO"]));

  // GLOBAL DEVELOPMENT ORGANIZATION (GDO) -> entity_groups
  const gdo = responseData.find(
    (c: any) => c.name === "GLOBAL DEVELOPMENT ORGANISATION (GDO)"
  );
  expect(gdo).toBeTruthy();
  const gdoEntityNames = (gdo.entity_groups || []).map((g: any) => g.name);
  expect(gdoEntityNames).toEqual(
    expect.arrayContaining(["GLOBAL DEVELOPMENT ORGANISATION (GDO)"])
  );
});

test("confirm account type entity group mapping - businesses", async ({}) => {
  const apiRequestContext = await playwrightRequest.newContext({
    ignoreHTTPSErrors: true,
    baseURL: process.env.API_BASE_URL,
  });
  // Generate authentication token
  const token = await generateToken(apiRequestContext);

  // Check limited companies entity group mapping
  const response = await apiRequestContext.get(
    "/api/v1/cib-onboarding/account_type/company-types/3",
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
    expect.arrayContaining(["SOLE PROPRIETOR", "PARTNERSHIP"])
  );

  // SOLE PROPRIETOR -> entity_groups
  const soleProprietor = responseData.find(
    (c: any) => c.name === "SOLE PROPRIETOR"
  );
  expect(soleProprietor).toBeTruthy();
  const soleProprietorEntityNames = (soleProprietor.entity_groups || []).map(
    (g: any) => g.name
  );
  expect(soleProprietorEntityNames).toEqual(
    expect.arrayContaining(["SOLE PROPRIETOR"])
  );

  // PARTNERSHIP -> entity_groups
  const partnership = responseData.find((c: any) => c.name === "PARTNERSHIP");
  expect(partnership).toBeTruthy();
  const partnershipEntityNames = (partnership.entity_groups || []).map(
    (g: any) => g.name
  );
  expect(partnershipEntityNames).toEqual(
    expect.arrayContaining(["PARTNERSHIP"])
  );
});

test("confirm account type entity group mapping - government entity", async ({}) => {
  const apiRequestContext = await playwrightRequest.newContext({
    ignoreHTTPSErrors: true,
    baseURL: process.env.API_BASE_URL,
  });
  // Generate authentication token
  const token = await generateToken(apiRequestContext);

  // Check limited companies entity group mapping
  const response = await apiRequestContext.get(
    "/api/v1/cib-onboarding/account_type/company-types/4",
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
    expect.arrayContaining(["STATE OWNED ENTITY", "SEMI-GOVERNMENT ENTITY"])
  );

  // STATE OWNED ENTITY -> entity_groups
  const stateOwnedEntity = responseData.find(
    (c: any) => c.name === "STATE OWNED ENTITY"
  );
  expect(stateOwnedEntity).toBeTruthy();
  const stateOwnedEntityNames = (stateOwnedEntity.entity_groups || []).map(
    (g: any) => g.name
  );
  expect(stateOwnedEntityNames).toEqual(
    expect.arrayContaining([
      "GOVERNMENT ORGANISATION",
      "GOVERNMENT DEPARTMENT",
      "GOVERNMENT MINISTRY",
      "LOCAL AUTHORITY",
      "LOCAL COUNCIL",
      "EMBASSIES",
    ])
  );

  // SEMI-GOVERNMENT ENTITY -> entity_groups
  const semiGovernmentEntity = responseData.find(
    (c: any) => c.name === "SEMI-GOVERNMENT ENTITY"
  );
  expect(semiGovernmentEntity).toBeTruthy();
  const semiGovernmentEntityNames = (
    semiGovernmentEntity.entity_groups || []
  ).map((g: any) => g.name);
  expect(semiGovernmentEntityNames).toEqual(
    expect.arrayContaining(["STATUTORY ENTITY", "PARASTATALS"])
  );
});
