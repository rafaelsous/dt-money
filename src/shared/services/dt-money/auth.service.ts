import { dtMoneyApi } from "@/api/dt-money";

import { FormLoginParams } from "@/components/LoginForm";

type UserResponse = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type LoginResponse = {
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
