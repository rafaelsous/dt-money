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
    refreshTransactions,
    loadMoreTransactions,
    loadings,
    handleLoadings,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      handleLoadings({
        key: "initial",
        value: true,
      });
      await fetchCategories();
    } catch (error) {
      handleError(
        error,
        "Não foi possível carregar as categorias de transação."
      );
    } finally {
      handleLoadings({
        key: "initial",
        value: false,
      });
    }
  }

  async function handleIntialFetchTransactions() {
    try {
      handleLoadings({
        key: "initial",
        value: true,
      });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Não foi possível carregar as transações.");
    } finally {
      handleLoadings({
        key: "initial",
        value: false,
      });
    }
  }

  async function handleLoadMoreTransactions() {
    try {
      handleLoadings({
        key: "loadMore",
        value: true,
      });
      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Não foi possível carregar mais transações.");
    } finally {
      handleLoadings({
        key: "loadMore",
        value: false,
      });
    }
  }

  async function handleRefreshTransactions() {
    try {
      handleLoadings({
        key: "refresh",
        value: true,
      });
      await refreshTransactions();
    } catch (error) {
      handleError(error, "Não foi possível atualizar as transações.");
    } finally {
      handleLoadings({
        key: "refresh",
        value: false,
      });
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
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
}
