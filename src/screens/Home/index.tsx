import { useEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTransactionContext } from "@/context/transaction.context";

import { useErrorHandler } from "@/shared/hooks/userErrorHandler";

import { ListHeader } from "@/components/ListHeader";

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
    <SafeAreaView className="flex-1 bg-background-secondary">
      <FlatList
        data={[]}
        renderItem={() => <></>}
        ListHeaderComponent={ListHeader}
      />
    </SafeAreaView>
  );
}
