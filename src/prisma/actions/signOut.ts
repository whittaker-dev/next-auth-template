"use server";

import { signOut } from "@/auth";
import { DEFAULT_REDIRECT } from "@/router";

export const signOutAction = async () => {
  await signOut({ redirectTo: DEFAULT_REDIRECT });
};
