import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

export const getToken = (): string => {
  const token = Cookies.get(TOKEN_KEY);
  if (!token) {
    return "";
  }
  return token;
};
export const setToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};
