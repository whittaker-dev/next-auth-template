"use client";
import { cookieKeys } from "@/constants/cookieKeys";
import { authApi } from "@/features/apis";
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "cookies-next";
import { getSession } from "next-auth/react";
export interface IApiClient {
  post<T>(path: string, object: T, config?: RequestConfig): Promise<any>;
  patch<T>(path: string, object: T): Promise<any>;
  put<T>(path: string, object: T): Promise<any>;
  get(path: string): Promise<any>;
}

export interface IResponseError {
  message: string;
  status: string;
}

export type HttpHeaders = {
  [key: string]: string;
};

export interface RequestConfig extends AxiosRequestConfig {
  headers: HttpHeaders;
}

export class ApiConfiguration {
  accessToken?: string;
}

class ApiClient implements IApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(): AxiosInstance {
    const api = Axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      responseType: "json" as const,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 150 * 1000,
    });

    api.interceptors.request.use(
      async (request) => {
        const accessToken = getCookie(cookieKeys.accessToken);
        request.headers["Authorization"] = `Bearer ${accessToken}`;
        return request;
      },
      (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        const err = error as AxiosError;
        const status = err.response?.status;
        const responseURL: string = err.request.responseURL;
        const excludeUrlsGetRefreshToken = [
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
        ];
        const config = err.config;
        if (
          status === 401 &&
          config &&
          !excludeUrlsGetRefreshToken.includes(responseURL)
        ) {
          // * Handle Refresh token logic
          const session = await getSession();
          const refreshToken = session?.user.refreshToken;
          if (!refreshToken) return Promise.reject(error);

          const { accessToken: newAccessToken } = await authApi.refreshToken(
            refreshToken
          );
          if (!newAccessToken) return Promise.reject(error);

          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          setCookie(cookieKeys.accessToken, newAccessToken);
          return api(config);
        }
        return Promise.reject(error);
      }
    );
    return api;
  }

  constructor() {
    this.client = this.createAxiosClient();
  }

  async post<T>(path: string, payload: T, config?: RequestConfig) {
    try {
      const response = config
        ? await this.client.post(path, payload, config)
        : await this.client.post(path, payload);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }

  async patch<T>(path: string, payload: T, config?: RequestConfig) {
    try {
      const response = config
        ? await this.client.patch(path, payload, config)
        : await this.client.patch(path, payload);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }

  async put<T>(path: string, payload: T, config?: RequestConfig) {
    try {
      const response = config
        ? await this.client.put(path, payload, config)
        : await this.client.put(path, payload);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }

  async get<T>(path: string, config?: RequestConfig) {
    try {
      const response = await this.client.get<T>(path, { ...config });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw error;
    }
  }

  async delete<T>(path: string, config?: RequestConfig) {
    try {
      const response = await this.client.delete<T>(path, { ...config });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }
}
export const apiClient = new ApiClient();
