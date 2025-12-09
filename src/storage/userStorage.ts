import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginResponse } from "@/shared/services/dt-money/auth.service";

export const USER_KEY = "@dt-money:user";

async function add(userData: LoginResponse) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
}

async function get(): Promise<LoginResponse | null> {
  const response = await AsyncStorage.getItem(USER_KEY);

  return response ? JSON.parse(response) : null;
}

async function clear() {
  await AsyncStorage.removeItem(USER_KEY);
}

export const userStorage = { add, get, clear };
