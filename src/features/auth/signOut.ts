"use server";

import { signOut } from "@/auth";
import { cookieKeys } from "@/constants/cookieKeys";
import { DEFAULT_REDIRECT } from "@/router";
import { cookies } from "next/headers";

export const signOutAction = async () => {
  cookies().delete(cookieKeys.accessToken);
  await signOut({ redirectTo: DEFAULT_REDIRECT });
};
