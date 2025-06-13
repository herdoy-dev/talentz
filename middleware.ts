import { NextRequest, NextResponse } from "next/server";
import getSession from "./actions/get-session";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // Allow only certain paths for unverified users
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

  if (session && (pathname === "/log-in" || pathname.startsWith("/sign-up"))) {
    if (session.role === "admin")
      return NextResponse.redirect(new URL("/admin", req.url));
    if (session.role === "client")
      return NextResponse.redirect(new URL("/buyer", req.url));
    if (session.role === "freelancer")
      return NextResponse.redirect(new URL("/seller", req.url));
  }

  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    (!session && pathname.startsWith("/buyer")) ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/seller") ||
    pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  if (session && pathname.startsWith("/admin")) {
    if (!session.isAdmin) return NextResponse.redirect(new URL("/", req.url));
  }

  if (session && pathname.startsWith("/buyer")) {
    if (session.role !== "client" || session.isAdmin)
      return NextResponse.redirect(new URL("/", req.url));
  }

  if (session && pathname.startsWith("/seller")) {
    if (session.role !== "freelancer" || session.isAdmin)
      return NextResponse.redirect(new URL("/", req.url));
  }

  if (session && pathname.startsWith("/profile-seller")) {
    if (session.role !== "freelancer" || session.isAdmin)
      return NextResponse.redirect(new URL("/", req.url));
  }

  if (session && pathname.startsWith("/profile-buyer")) {
    if (session.role !== "client" || session.isAdmin)
      return NextResponse.redirect(new URL("/", req.url));
  }

  if (session && pathname.startsWith("/profile-admin")) {
    if (!session.isAdmin) return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
