import "./src/styles/global.css";

import { AuthContextProvider } from "@/context/auth.context";

import { Routes } from "@/routes";

export default function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}
