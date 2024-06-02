import { NextResponse } from "next/server";
import { auth } from "./auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./router";

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.includes(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  return NextResponse.next()
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|fonts|icons|favicon.ico).*)",
  ],
};
