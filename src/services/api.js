import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
import TokenService from "../services/token.service";
console.log("baseURL:", baseURL);
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json", 
  },
});

instance.interceptors.request.use((config) => {
  const token = TokenService.getLocalAccessToken(); 
  if (token) {
    config.headers["x-access-token"] = token; 
  }
  return config;
});

export default instance;
