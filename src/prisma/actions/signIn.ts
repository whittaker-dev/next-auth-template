"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/router";
import { AuthError } from "next-auth";
import { IPayloadSignIn } from "./interface/auth.interface";

export const signInAction = async (payload: IPayloadSignIn) => {
  try {
    const { email, password } = payload;
    console.log({ DEFAULT_LOGIN_REDIRECT });
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("** Error Type ****", error.type);
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Email or password incorrect");
        default:
          throw new Error("Something went wrong!");
      }
    }
    throw error;
  }
};
