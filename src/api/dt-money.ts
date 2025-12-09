import axios from "axios";
import { Platform } from "react-native";

const emulatorIP = "10.0.2.2";
const computerIP = "192.168.10.105";

const baseUrl = Platform.select({
  ios: "http://localhost:3001",
  android: `http://${computerIP}:3001`,
});

export const dtMoneyApi = axios.create({
  baseURL: baseUrl,
});
