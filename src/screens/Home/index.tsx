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
    loadMoreTransactions,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(
        error,
        "Não foi possível carregar as categorias de transação."
      );
    }
  }

  async function handleIntialFetchTransactions() {
    try {
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Não foi possível carregar as transações.");
    }
  }

  async function handleLoadMoreTransactions() {
    try {
      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Não foi possível carregar mais transações.");
    }
  }

  async function handleRefreshTransactions() {
    try {
      await refreshTransactions();
    } catch (error) {
      handleError(error, "Não foi possível atualizar as transações.");
    }
  }

  useEffect(() => {
    (async () => {
      await Promise.all([
        handleFetchCategories(),
        handleIntialFetchTransactions(),
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
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
}
