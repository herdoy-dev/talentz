import { NextRequest, NextResponse } from "next/server";
import getSession from "./actions/get-session";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  if (session && (pathname === "/log-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
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
