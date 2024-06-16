"use server";

import { signOut } from "@/auth";
import { searchParamsKeys } from "@/constants";
import { DEFAULT_REDIRECT } from "@/router";

export const signOutAction = async (returnUrl?: string) => {
  await signOut({
    redirectTo: `${DEFAULT_REDIRECT}?${searchParamsKeys.returnUrl}=${returnUrl}`,
  });
};
