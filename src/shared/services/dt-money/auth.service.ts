import { dtMoneyApi } from "@/api/dt-money";

import { FormLoginParams } from "@/components/LoginForm";
import { FormRegisterParams } from "@/components/RegisterForm";

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export type LoginResponse = {
  user: UserResponse;
  token: string;
};

export async function authenticate(
  loginData: FormLoginParams
): Promise<LoginResponse> {
  const { data } = await dtMoneyApi.post<LoginResponse>(
    "/auth/login",
    loginData
  );

  return data;
}

export async function register(
  registerData: FormRegisterParams
): Promise<LoginResponse> {
  const { data } = await dtMoneyApi.post<LoginResponse>(
    "/auth/register",
    registerData
  );

  return data;
}
