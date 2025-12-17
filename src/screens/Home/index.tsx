import { useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTransactionContext } from "@/context/transaction.context";

import { useErrorHandler } from "@/shared/hooks/userErrorHandler";

import { ListHeader } from "@/components/ListHeader";
import { TransactionCard } from "@/components/TransactionCard";

export function Home() {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    isLoading,
    refreshTransactions,
  } = useTransactionContext();
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
      await Promise.all([
        handleFetchCategories(),
        fetchTransactions({ page: 1 }),
      ]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        keyExtractor={(item) => `transaction-${item.id}`}
        data={transactions}
        renderItem={({ item: transaction }) => (
          <TransactionCard transaction={transaction} />
        )}
        ListHeaderComponent={ListHeader}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
}
