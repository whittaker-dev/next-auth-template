"use server";

import { cookieKeys } from "@/constants/cookieKeys";
import { cookies } from "next/headers";

export const setCookies = (accessToken: string) => {
  return cookies().set({
    name: `${cookieKeys.accessToken}`,
    value: accessToken,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
};
