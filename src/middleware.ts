import { auth } from "./auth";
import { DEFAULT_REDIRECT, publicRouters } from "./router";


export default auth((req) => {
	const { nextUrl } = req;
  console.log(">>>> Req auth", req.auth)

	// const isAuthenticated = !!req.auth;
	// const isPublicRoute = publicRouters.includes(nextUrl.pathname);

	// if (isPublicRoute && isAuthenticated)
	// 	return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

	// if (!isAuthenticated && !isPublicRoute)
	// 	return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|images|fonts|icons|favicon.ico).*)']
};