import clsx from "clsx";
import { Text, View } from "react-native";
import { CalendarBlankIcon, TagSimpleIcon } from "phosphor-react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { colors } from "@/shared/colors";

import { formatDateTime } from "@/utils/formatDateTime";
import { TransactionTypes } from "@/enums/TransactionTpes";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { Transaction } from "@/shared/services/dt-money/transaction.service";

import { RightAction } from "../RightAction";
import { LeftAction } from "../LeftAction";

type Props = {
  transaction: Transaction;
};

export function TransactionCard({ transaction }: Readonly<Props>) {
  const isExpensiveTransaction =
    transaction.type.id === TransactionTypes.EXPENSE;

  return (
    <Swipeable
      containerStyle={{
        width: "90%",
        marginBottom: 16,
        alignItems: "center",
        alignSelf: "center",
        overflow: "visible",
      }}
      renderRightActions={() => <RightAction transactionId={transaction.id} />}
      renderLeftActions={() => <LeftAction transaction={transaction} />}
      overshootRight={false}
      overshootLeft={false}
    >
      <View className="h-[140] p-6 bg-background-tertiary rounded-md gap-2">
        <Text className="text-base text-white">{transaction.description}</Text>
        <Text
          className={clsx(
            "text-2xl font-bold",
            isExpensiveTransaction
              ? "text-accent-red"
              : "text-accent-brand-light"
          )}
        >
          {isExpensiveTransaction && "- "}
          {numberToCurrency(transaction.value)}
        </Text>

        <View className="w-full flex-1 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <TagSimpleIcon size={16} color={colors.gray[700]} />
            <Text className="text-base text-gray-700">
              {transaction.category.name}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <CalendarBlankIcon size={16} color={colors.gray[700]} />
            <Text className="text-base text-gray-700">
              {formatDateTime(transaction.createdAt, "DD/MM/YYYY")}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
}
