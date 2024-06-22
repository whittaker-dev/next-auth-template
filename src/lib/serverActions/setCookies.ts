"use server";

import { cookieKeys } from "@/constants/cookieKeys";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
export const setCookies = (accessToken: string) => {
  return setCookie(`${cookieKeys.accessToken}`, accessToken, { cookies });
};
