"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/router";
import { BuiltInProviderType, Provider } from "next-auth/providers";
import { LiteralUnion } from "next-auth/react";

export const signInSocial = async (
  type: LiteralUnion<BuiltInProviderType>,
  redirectUrl?: string
) => {
  try {
    await signIn(type, {
      redirectTo: redirectUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
