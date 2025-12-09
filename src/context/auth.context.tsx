import { createContext, PropsWithChildren, useContext, useState } from "react";

import { FormLoginParams } from "@/components/LoginForm";
import { FormRegisterParams } from "@/components/RegisterForm";

type AuthContextType = {
  user: null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthContextProvider({ children }: Readonly<PropsWithChildren>) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  async function handleAuthenticate({ email, password }: FormLoginParams) {}

  async function handleRegister({
    name,
    email,
    password,
    confirmPassword,
  }: FormRegisterParams) {}

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
