import { getToken } from "@/lib/auth";
import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import defaultInstance from "./api.instance";

interface IRequest<T> {
  data?: T;
  message: string;
  error?: string;
}

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any,
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export default class APIRequest {
  private token: string = '';
  private instance: AxiosInstance;

  constructor(instance?: AxiosInstance) {
    this.instance = instance ?? defaultInstance;
    if (typeof window !== 'undefined') this.token = getToken();
  }
  
  async request<T>(config: AxiosRequestConfig, authorized: boolean = true): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...(authorized ? { Authorization: `Bearer ${this.token}` } : {}),
      ...config.headers,
    };
    try {
      const response = await this.instance.request<IRequest<T>>({
        ...config,
        headers,
      });
      if (+response.status < 300) {
        if (typeof response.data !== 'string' && 'data' in response.data && response.data)
          return response.data.data as T;
        return response.data as T;
      } else {
        return response.data as T;
        // throw new APIError(
        //   'An unexpected error occurred',
        //   400, // TODO (CAN BE CHANGE)
        // );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          console.log(error.message);
          return error.response.data as T;
        }
        throw new APIError(
          error.response?.data?.message || error.message,
          error.response?.status,
          error.response?.data,
        );
      }
      throw new APIError('An unexpected error occurred');
    }
  }
}