import { getToken } from "@/lib/auth";
import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import defaultInstance from "./api.instance";

export class APIError extends Error {
  constructor(message: string, public statusCode?: number, public data?: any) {
    super(message);
    this.name = "APIError";
  }
}

export default class APIRequest {
  private token: string = "";
  private instance: AxiosInstance;

  constructor(instance?: AxiosInstance) {
    this.instance = instance ?? defaultInstance;
    if (typeof window !== "undefined") this.token = getToken();
  }

  async request<T>(
    config: AxiosRequestConfig,
    authorized: boolean = true
  ): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
      ...(authorized ? { Authorization: `Bearer ${this.token}` } : {}),
      ...config.headers,
    };
    try {
      const response = await this.instance.request<IResponse<T>>({
        ...config,
        headers,
      });
      if (typeof response.data !== "string") {
        if (response.data.success) return response.data.data as T;

        throw new APIError(
          response.data.message,
          response.status,
          response.data
        );
      }
      return response.data as T;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          if ("success" in error.response.data) {
            return error.response.data.data as T;
          }
          return error.response.data as T;
        }
        throw new APIError(
          error.response?.data?.message || error.message,
          error.response?.status,
          error.response?.data
        );
      }
      throw new APIError("An unexpected error occurred");
    }
  }
}
