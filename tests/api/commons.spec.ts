// tests for the account types API
import { test, expect, request as playwrightRequest } from "@playwright/test";
import { generateToken } from "./helpers/generate-token";

let createdAccTypeId: string | number | undefined;
