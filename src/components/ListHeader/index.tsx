import { ScrollView, View } from "react-native";

import { TransactionTypes } from "@/enums/TransactionTpes";

import { useTransactionContext } from "@/context/transaction.context";

import { FilterInput } from "../FilterInput";
import { AppHeader } from "@/components/AppHeader";
import { TransactionSummaryCard } from "../TransactionSummaryCard";

export const ListHeader = () => {
  const { totalTransactions } = useTransactionContext();
  return (
    <>
      <AppHeader />

      <View className="w-full h-[150]">
        <View className="h-[50] bg-background-primary" />

        <ScrollView
          className="absolute ml-6 h-[141]"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TransactionSummaryCard
            type={TransactionTypes.EXPENSE}
            amount={totalTransactions.expense}
          />

          <TransactionSummaryCard
            type={TransactionTypes.REVENUE}
            amount={totalTransactions.revenue}
          />

          <TransactionSummaryCard
            type="total"
            amount={totalTransactions.total}
          />
        </ScrollView>
      </View>

      <FilterInput />
    </>
  );
};
