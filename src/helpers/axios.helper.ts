import { AxiosInstance } from "axios";

import { userStorage } from "@/storage/userStorage";

export function addTokenToRequestHeader(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(async (config) => {
    const userData = await userStorage.get();

    if (userData) {
      const { token } = userData;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });
}
