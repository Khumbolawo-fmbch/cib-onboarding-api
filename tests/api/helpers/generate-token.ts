import { APIRequestContext } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// generate token and save it to variable
export async function generateToken(request: APIRequestContext) {
  const username = process.env.SECURE_API_AUTH_USERNAME || "";
  const password = process.env.SECURE_API_AUTH_PASSWORD || "";
  const systemId = "CIB_ONBOARDING";

  if (!username || !password) {
    throw new Error("USERNAME or PASSWORD environment variables are not set.");
  }

  const response = await request.post(
    "https://mwul-dtd-app1:89/identity/oauth2/domain/system",
    {
      data: {
        username: username,
        password: password,
        systemId: systemId,
      },
    }
  );

  if (!response.ok()) {
    throw new Error(
      `Failed to get token: ${response.status()} ${await response.text()}`
    );
  }

  const token = await response.json();
  console.log("Using Token:", token.token.access_token);
  return token.token.access_token;
}
