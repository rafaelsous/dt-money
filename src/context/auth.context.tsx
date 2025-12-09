import { createContext, PropsWithChildren, useContext, useState } from "react";

import {
  authenticate,
  UserResponse,
} from "@/shared/services/dt-money/auth.service";

import { FormLoginParams } from "@/components/LoginForm";
import { FormRegisterParams } from "@/components/RegisterForm";

type AuthContextType = {
  user: UserResponse | null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthContextProvider({ children }: Readonly<PropsWithChildren>) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function handleAuthenticate(loginData: FormLoginParams) {
    const { user, token } = await authenticate(loginData);

    console.log({ user, token });

    setUser(user);
    setToken(token);
  }

  async function handleRegister(registerData: FormRegisterParams) {}

  function handleLogout() {}

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthContext, AuthContextProvider, useAuthContext };
