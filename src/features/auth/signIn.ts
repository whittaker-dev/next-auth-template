"use server";

import { signIn } from "@/auth";
import { IPayloadSignIn } from "@/features/apis/interfaces";
import { DEFAULT_LOGIN_REDIRECT } from "@/router";
import { AuthError } from "next-auth";

export const signInAction = async (
  payload: IPayloadSignIn,
  redirectTo?: string
) => {
  try {
    const { email, password } = payload;
    await signIn("credentials", {
      email,
      password,
      redirectTo: `/${redirectTo}` ?? DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Email or password incorrect");
        default:
          throw new Error(error.cause?.err?.message);
      }
    }
    throw error;
  }
};
