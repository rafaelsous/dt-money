import { Snackbar } from "@/components/Snackbar";
import "./src/styles/global.css";

import { AuthContextProvider } from "@/context/auth.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";

import { Routes } from "@/routes";

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <Routes />

        <Snackbar />
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}
