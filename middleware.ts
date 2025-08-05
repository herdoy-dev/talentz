import { NextRequest, NextResponse } from "next/server";
import getSession from "./actions/get-session";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  try {
    const session = await getSession();
    const { pathname } = req.nextUrl;

    // Skip public files
    if (PUBLIC_FILE.test(pathname)) {
      return NextResponse.next();
    }

    // Redirect unverified users
    if (session && !session.isVerified) {
      return NextResponse.redirect(new URL("/verify", req.url));
    }

    // Protect dashboard routes
    if (
      !session &&
      (pathname.startsWith("/dashboard/admin") ||
        pathname.startsWith("/dashboard/seller") ||
        pathname.startsWith("/dashboard/buyer"))
    ) {
      return NextResponse.redirect(new URL("/log-in", req.url));
    }

    // Protect profile routes
    if (
      !session &&
      (pathname.startsWith("/profile/admin") ||
        pathname.startsWith("/profile/seller") ||
        pathname.startsWith("/profile/buyer"))
    ) {
      return NextResponse.redirect(new URL("/log-in", req.url));
    }

    // Redirect authenticated users away from auth pages
    if (
      session &&
      (pathname.startsWith("/log-in") || pathname.startsWith("/sign-up"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/error", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
