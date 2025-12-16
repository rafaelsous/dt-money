import { ScrollView, View } from "react-native";

import { TransactionTypes } from "@/enums/TransactionTpes";

import { useTransactionContext } from "@/context/transaction.context";

import { AppHeader } from "@/components/AppHeader";
import { TransactionCard } from "../TransactionCard";

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
          <TransactionCard
            type={TransactionTypes.EXPENSE}
            amount={totalTransactions.expense}
          />

          <TransactionCard
            type={TransactionTypes.REVENUE}
            amount={totalTransactions.revenue}
          />

          <TransactionCard type="total" amount={totalTransactions.total} />
        </ScrollView>
      </View>
    </>
  );
};
