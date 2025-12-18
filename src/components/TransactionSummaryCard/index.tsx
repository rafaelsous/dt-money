import clsx from "clsx";
import { Text, View } from "react-native";

import { TransactionTypes } from "@/enums/TransactionTpes";

import { useTransactionContext } from "@/context/transaction.context";

import { ICONS } from "@/strategies/icon-strategy";
import { CARD_DATA } from "@/strategies/card-data-strategy";

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

  const { transactions, filters } = useTransactionContext();

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  );

  function renderDateInfo() {
    if (type === "total") {
      return (
        <Text
          className={clsx(
            "text-base",
            amount >= 0 ? "text-accent-brand-light" : "text-red-300"
          )}
        >
          {filters.from && filters.to
            ? `De ${formatDateTime(
                filters.from,
                "DD/MM/YYYY"
              )} até ${formatDateTime(filters.to, "DD/MM/YYYY")}`
            : "Todo o período"}
        </Text>
      );
    } else {
      return (
        <Text className="text-gray-700">
          {lastTransaction?.createdAt
            ? `Última ${cardData.label.toLowerCase()} em ${formatDateTime(
                lastTransaction.createdAt,
                "D [de] MMMM"
              )}`
            : "Nenhuma transação encontrada"}
        </Text>
      );
    }
  }

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

        {renderDateInfo()}
      </View>
    </View>
  );
}
