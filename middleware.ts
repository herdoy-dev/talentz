import { NextRequest, NextResponse } from "next/server";
import getSession from "./actions/get-session";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  if (session && !session.isVerified) {
    const allowedPaths = [
      "/",
      "/jobs",
      "/talents",
      "/log-in",
      "/sign-up",
      "/verify",
    ];
    const isAllowed = allowedPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/verify", req.url));
    }
  }

  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  if (session && (pathname === "/log-in" || pathname.startsWith("/sign-up")))
    return NextResponse.redirect(new URL("/dashboard", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
