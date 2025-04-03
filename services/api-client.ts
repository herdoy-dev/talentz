import getToken from "@/actions/get-token";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers["x-auth-token"] = token ? token : "";
  return config;
});

export default instance;
