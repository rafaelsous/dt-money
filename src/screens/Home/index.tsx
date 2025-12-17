import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";

import { colors } from "@/shared/colors";

import { useErrorHandler } from "@/shared/hooks/userErrorHandler";
import { useTransactionContext } from "@/context/transaction.context";

import { EmptyList } from "@/components/EmptyList";
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
      console.log(transactions);

      await Promise.all([
        handleFetchCategories(),
        handleIntialFetchTransactions(),
      ]);

      handleLoadings({
        key: "initial",
        value: false,
      });
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        keyExtractor={(item) => `transaction-${item.id}`}
        data={loadings.initial ? [] : transactions}
        renderItem={({ item: transaction }) => (
          <TransactionCard transaction={transaction} />
        )}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={loadings.initial ? null : EmptyList}
        ListFooterComponent={
          loadings.loadMore ? (
            <ActivityIndicator
              size="large"
              color={colors["accent-brand-light"]}
            />
          ) : null
        }
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
