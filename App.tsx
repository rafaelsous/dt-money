import "./src/styles/global.css";

import { Snackbar } from "@/components/Snackbar";

import { AuthContextProvider } from "@/context/auth.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";
import { BottomSheetContextProvider } from "@/context/bottomsheet.context";

import { Routes } from "@/routes";

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <BottomSheetContextProvider>
          <Routes />

          <Snackbar />
        </BottomSheetContextProvider>
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}
