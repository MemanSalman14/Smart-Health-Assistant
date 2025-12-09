import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://backend-smarthealthassistant.vercel.app/api/v1"
      : "/",
  withCredentials: true,
});
