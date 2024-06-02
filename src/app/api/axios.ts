"use client";
import { IError } from "@/utils/shared";
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
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

    api.interceptors.response.use((response) => {
      return response.data;
    });

    api.interceptors.request.use(async (request) => {
      const session = await getSession();
      const accessToken = session?.user.accessToken;
      request.headers["Authorization"] = `Bearer ${accessToken}`;
      return request;
    });
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
      return this.handleServiceError(err);
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
      return this.handleServiceError(err);
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
      return this.handleServiceError(err);
    }
  }

  async get<T>(path: string, config?: RequestConfig) {
    try {
      const response = await this.client.get<T>(path, { ...config });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return this.handleServiceError(err);
    }
  }

  async delete<T>(path: string, config?: RequestConfig) {
    try {
      const response = await this.client.delete<T>(path, { ...config });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return this.handleServiceError(err);
    }
  }

  async handleServiceError(error: AxiosError) {
    if (error.response) {
      const { status, data } = error.response;

      const dataError = data as IResponseError;
      if (status === 401 && error.config) {
        // * Handle Refresh token logic
      }

      throw {
        message: dataError.message,
        status: dataError.status,
        stack: "Error",
      } as IError;
    }
  }
}
export const apiClient = new ApiClient();
