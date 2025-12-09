import { createContext, PropsWithChildren, useContext, useState } from "react";

import {
  authenticate,
  LoginResponse,
  register,
  UserResponse,
} from "@/shared/services/dt-money/auth.service";
import { userStorage } from "@/storage/userStorage";

import { FormLoginParams } from "@/components/LoginForm";
import { FormRegisterParams } from "@/components/RegisterForm";

type AuthContextType = {
  user: UserResponse | null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<LoginResponse | null>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthContextProvider({ children }: Readonly<PropsWithChildren>) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function handleAuthenticate(loginData: FormLoginParams) {
    const { user, token } = await authenticate(loginData);

    await userStorage.add({ user, token });

    setUser(user);
    setToken(token);
  }

  function handleLogout() {}

  async function restoreUserSession() {
    const data = await userStorage.get();

    if (data) {
      const { user, token } = data;

      setUser(user);
      setToken(token);
    }

    return data;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

async function handleRegister(registerData: FormRegisterParams) {
  await register(registerData);
}

function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthContext, AuthContextProvider, useAuthContext };
