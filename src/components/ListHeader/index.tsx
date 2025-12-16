import { ScrollView, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { TransactionCard } from "../TransactionCard";
import { TransactionTypes } from "@/enums/TransactionTpes";

export const ListHeader = () => {
  return (
    <>
      <AppHeader />

      <View className="w-full h-[150]">
        <View className="h-[50] bg-background-primary" />

        <ScrollView
          className="absolute pl-6 h-[141]"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TransactionCard type={TransactionTypes.REVENUE} amount={0} />
          <TransactionCard type={TransactionTypes.EXPENSE} amount={0} />
          <TransactionCard type="total" amount={0} />
        </ScrollView>
      </View>
    </>
  );
};
