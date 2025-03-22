import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const session = await auth();
  const path = request.nextUrl.pathname;

  // Protected routes
  const protectedRoutes = ["/dashboard/student", "/dashboard/club"];

  // Redirect to login if accessing protected route without session
  if (protectedRoutes.some((route) => path.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent role mismatch
  if (
    path.startsWith("/dashboard/student") &&
    session?.user.userType !== "student"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/dashboard/club") && session?.user.userType !== "club") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
