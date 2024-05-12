/**
 * The url form default redirect
 * @type {string}
 */
export const DEFAULT_REDIRECT = "/sign-in";

/**
 * The url form default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";


/**
 * An array of routes that used for public
 * Use can move this route, don't need login
 * @type {string[]}
 */
export const publicRoutes = ["/", "/term-and-policy"];

/**
 * An array of routes that used for private
 * Use can move this route if authorization
 * @type {string[]}
 */
export const privateRoutes = ["/dev", "/profile"];

/**
 * The prefix url for api authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * An array of routes that used for authentication
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up"];
