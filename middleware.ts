import { NextRequest, NextResponse } from "next/server";
import getSession from "./actions/get-session";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  try {
    const session = await getSession();
    const { pathname } = req.nextUrl;

    if (PUBLIC_FILE.test(pathname)) {
      return NextResponse.next();
    }

    if (
      session &&
      session.role !== "admin" &&
      pathname.startsWith("/dashboard/admin")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (
      session &&
      session.role !== "freelancer" &&
      pathname.startsWith("/dashboard/seller")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (
      session &&
      session.role !== "client" &&
      pathname.startsWith("/dashboard/buyer")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (
      session &&
      session.role !== "admin" &&
      pathname.startsWith("/profile/admin")
    ) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    if (
      session &&
      session.role !== "freelancer" &&
      pathname.startsWith("/profile/seller")
    ) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    if (
      session &&
      session.role !== "client" &&
      pathname.startsWith("/profile/buyer")
    ) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    if (
      !session &&
      (pathname.startsWith("/dashboard/admin") ||
        pathname.startsWith("/dashboard/seller") ||
        pathname.startsWith("/dashboard/buyer"))
    ) {
      return NextResponse.redirect(new URL("/log-in", req.url));
    }

    if (
      !session &&
      (pathname.startsWith("/profile/admin") ||
        pathname.startsWith("/profile/seller") ||
        pathname.startsWith("/profile/buyer"))
    ) {
      return NextResponse.redirect(new URL("/log-in", req.url));
    }

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
