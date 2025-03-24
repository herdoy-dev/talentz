"use server";
import { cookies } from "next/headers";

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
