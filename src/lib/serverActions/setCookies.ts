"use server";

import { cookieKeys } from "@/constants/cookieKeys";
import { setCookie } from "cookies-next";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
export const setCookies = (accessToken: string) => {
  // return cookies().set({
  //   name: `${cookieKeys.accessToken}`,
  //   value: accessToken,
  //   httpOnly: true,
  //   sameSite: "strict",
  //   secure: false,
  // });

  return setCookie(`${cookieKeys.accessToken}`, accessToken, { cookies });
};
