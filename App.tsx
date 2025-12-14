import "./src/styles/global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Snackbar } from "@/components/Snackbar";

import { AuthContextProvider } from "@/context/auth.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";
import { BottomSheetContextProvider } from "@/context/bottomsheet.context";
import { TransactionContextProvider } from "@/context/transaction.context";

import { Routes } from "@/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <SnackbarContextProvider>
          <AuthContextProvider>
            <TransactionContextProvider>
              <BottomSheetContextProvider>
                <Routes />

                <Snackbar />
              </BottomSheetContextProvider>
            </TransactionContextProvider>
          </AuthContextProvider>
        </SnackbarContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
