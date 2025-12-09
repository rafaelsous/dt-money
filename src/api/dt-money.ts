import axios from "axios";
import { Platform } from "react-native";

const baseUrl = Platform.select({
  ios: "http://localhost:3001",
  android: "http://10.0.2.2:3001",
});

export const dtMoneyApi = axios.create({
  baseURL: baseUrl,
});

// export { dtMoneyApi }
