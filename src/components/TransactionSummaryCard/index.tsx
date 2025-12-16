import { Text, View } from "react-native";

import { ICONS } from "@/strategies/icon-strategy";
import { TransactionTypes } from "@/enums/TransactionTpes";
import { CARD_DATA } from "@/strategies/card-data-strategy";
import { useTransactionContext } from "@/context/transaction.context";
import { formatDateTime } from "@/utils/formatDateTime";
import { numberToCurrency } from "@/utils/numberToCurrency";

export type TransactionCardType = TransactionTypes | "total";

type Props = {
  type: TransactionCardType;
  amount: number;
};

export function TransactionSummaryCard({ type, amount }: Readonly<Props>) {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  const { transactions } = useTransactionContext();

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  );

  return (
    <View
      className={`min-w-[280] mr-6 px-8 py-6 justify-between bg-${
        amount >= 0 ? cardData.bgColor : "accent-red-background-primary"
      } rounded-md`}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-white">{cardData.label}</Text>
        {iconData.icon}
      </View>

      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          {numberToCurrency(amount)}
        </Text>

        {type !== "total" && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? `Última ${cardData.label.toLowerCase()} em ${formatDateTime(
                  lastTransaction.createdAt,
                  "D [de] MMMM"
                )}`
              : "Nenhuma transação encontrada"}
          </Text>
        )}
      </View>
    </View>
  );
}
