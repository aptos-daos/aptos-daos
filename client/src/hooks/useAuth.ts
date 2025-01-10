import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import axiosInstance,{ nonSecuredInstance } from "@/libs/instance";
import Cookies from 'js-cookie';

type Role = "ADMIN" | "USER";

interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const useAuth = () => {
  const router = useRouter();
  const { addToast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      const response = await nonSecuredInstance.post<Response<AuthResponse>>(
        "/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        // Store token in cookie
        Cookies.set('token', response.data.data.token, { expires: 7, path: '/' });
        addToast("Login successful", "success");
        router.refresh();
        return response.data.data;
      }
    } catch (error: any) {
      addToast(error.response?.data?.message || "Login failed", "error");
      return null;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await nonSecuredInstance.post<Response<User>>(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      if (response.data.success) {
        addToast("Registration successful", "success");
        router.push("/login");
        return response.data.data;
      }
    } catch (error: any) {
      console.error(error);
      addToast(error.response?.data?.message || "Registration failed", "error");
      return null;
    }
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.get<Response<User>>("/auth/me");
      return response.data.data;
    } catch (error) {
      return null;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    addToast("Logged out successfully", "success");
    router.refresh();
  };

  return {
    login,
    logout,
    register,
    getUser,
  };
};
