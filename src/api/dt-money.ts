import axios from "axios";
import { Platform } from "react-native";

import { AppError } from "@/helpers/AppError";
import { addTokenToRequestHeader } from "@/helpers/axios.helper";

const isPhysicalDevice: boolean = true;

const baseUrl = Platform.select({
  ios: "http://localhost:3001",
  android: isPhysicalDevice
    ? "http://192.168.10.105:3001"
    : "http://10.0.2.2:3001",
});

export const dtMoneyApi = axios.create({
  baseURL: baseUrl,
});

addTokenToRequestHeader(dtMoneyApi);

dtMoneyApi.interceptors.response.use(
  (config) => config,
  (error) => {
    const message =
      error.response?.data?.message ??
      "Ocorreu um erro inesperado. Tente novamente.";

    return Promise.reject(new AppError(message));
  }
);
