import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get("session_id")?.value
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin/dashboard")
  const isLoginRoute = request.nextUrl.pathname === "/admin/login"

  // If trying to access admin routes without being logged in
  if (isAdminRoute && !sessionId) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // If trying to access login page while already logged in
  if (isLoginRoute && sessionId) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
