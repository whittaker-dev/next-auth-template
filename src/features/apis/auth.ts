import { apiClient } from "@/app/api/axios";
import {
  EAuthProvider,
  IPayloadAuthSocial,
  IPayloadSignIn,
  IPayloadSignUp,
  IUser,
} from "@/features/apis/interfaces";
import { Profile } from "next-auth";

class AuthApi {
  async signUp(payload: IPayloadSignUp): Promise<IUser> {
    try {
      const data = await apiClient.post(`/auth/sign-up`, payload);
      return data.user;
    } catch (error) {
      throw error;
    }
  }

  async signIn(payload: IPayloadSignIn): Promise<IUser> {
    "use server";
    try {
      const user = await apiClient.post(`/auth/sign-in`, payload);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async handleLoginSocialAccount(profile: IPayloadAuthSocial) {
    let body = {};
    if (profile.provider === EAuthProvider.Github) {
      body = {
        id: profile?.id,
        avatar: profile?.avatar ?? "",
        name: profile?.name,
        location: profile.location,
      };
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/social/${EAuthProvider.Github}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...body,
        }),
      }
    );
    const data = await res.json();
    return data.data;
  }

  async getUser(accessToken: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/get-user`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }
}

export const authApi = new AuthApi();
