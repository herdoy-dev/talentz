"use server";
import { cookies } from "next/headers";

export default async function getToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    return token;
  } catch (error) {
    console.error("Failed to get token:", error);
    return null;
  }
}
