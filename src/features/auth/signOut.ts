"use server";

import { signOut } from "@/auth";
import { searchParamsKeys } from "@/constants";
import { cookieKeys } from "@/constants/cookieKeys";
import { DEFAULT_REDIRECT } from "@/router";
import { cookies } from "next/headers";

export const signOutAction = async (returnUrl?: string) => {
  cookies().delete(cookieKeys.accessToken);
  await signOut({
    redirectTo: `${DEFAULT_REDIRECT}?${searchParamsKeys.returnUrl}=${returnUrl}`,
  });
};
