"use server";

import { cookies } from "next/headers";

export async function setAuthToken(token: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10); // 10 years from now

    cookieStore.set("token", token, {
      expires: expirationDate,
      httpOnly: true,
    });
  } catch (error) {
    console.error("Failed to set authentication token:", error);
    throw new Error("Failed to set authentication token");
  }
}
