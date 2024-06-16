"use server";

import { auth } from "@/auth";
import { authApi } from "@/features/apis";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";

interface NextOptions {
  revalidate?: false | 0 | number;
  tags?: string[];
}

const _fetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: any,
  options: NextOptions = {},
  cache: "force-cache" | "no-store" = "no-store"
) => {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const refreshToken = session?.user.refreshToken;

  const request: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    next: options,
  };

  if (accessToken) {
    let _newAccessToken = accessToken;
    const { exp } = jwtDecode(accessToken);
    if (exp) {
      const currentTime = new Date();
      if (currentTime.getTime() > exp * 1000) {
        const data = await authApi.refreshToken(refreshToken ?? "");
        _newAccessToken = data.accessToken;
      }
    }
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${_newAccessToken}`,
    };
  }

  if (body) {
    request.body = JSON.stringify(body);
  }

  if (!Object.keys(options).length) {
    request.cache = cache;
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + url,
      request
    );

    if (!response.ok) {
      console.error("API request failed with response", response);
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};
export { _fetch };
