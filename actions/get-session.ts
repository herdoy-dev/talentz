"use server";

import Session from "@/schemas/Session";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    const decoded = jwtDecode<Session>(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}
