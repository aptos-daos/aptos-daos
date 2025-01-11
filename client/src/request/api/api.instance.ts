import axios from "axios";

export const BACKEND = process.env.NEXT_PUBLIC_SERVER_URL as string ?? "http://localhost:8080";
const timeout = process.env.NEXT_PUBLIC_API_TIMEOUT as string ?? "5000";

const instance = axios.create({
  baseURL: new URL(BACKEND).href,
  timeout: +timeout,
});

export default instance;