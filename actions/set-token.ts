"use server";

import { cookies } from "next/headers";

const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

export async function setAuthToken(token: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    const expirationDate = new Date(Date.now() + TOKEN_EXPIRATION_TIME);

    cookieStore.set("token", token, {
      expires: expirationDate,
      httpOnly: true,
    });
  } catch (error) {
    console.error("Failed to set authentication token:", error);
    throw new Error("Failed to set authentication token");
  }
}
