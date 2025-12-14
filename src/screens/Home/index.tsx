import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTransactionContext } from "@/context/transaction.context";

import { AppHeader } from "@/components/AppHeader";
import { useErrorHandler } from "@/shared/hooks/userErrorHandler";

export function Home() {
  const { fetchCategories } = useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(
        error,
        "Não foi possível carregar as categorias de transações."
      );
    }
  }

  useEffect(() => {
    (async () => {
      await handleFetchCategories();
    })();
  }, []);

  return (
    <SafeAreaView className="px-8 py-12 flex-1 gap-10 bg-background-primary">
      <AppHeader />

      <Text className="text-base font-bold text-white">Home Screen</Text>
    </SafeAreaView>
  );
}
