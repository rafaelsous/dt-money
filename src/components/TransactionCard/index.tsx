import { Text, View } from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { ICONS } from "@/strategies/icon-strategy";
import { TransactionTypes } from "@/enums/TransactionTpes";
import { CARD_DATA } from "@/strategies/card-data-strategy";
import { useTransactionContext } from "@/context/transaction.context";

export type TransactionCardType = TransactionTypes | "total";

type Props = {
  type: TransactionCardType;
  amount: number;
};

export function TransactionCard({ type, amount }: Readonly<Props>) {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  const { transactions } = useTransactionContext();

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  );

  return (
    <View
      className={`min-w-[280] mr-6 px-8 py-6 justify-between bg-${cardData.bgColor} rounded-md`}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-white">{cardData.label}</Text>
        {iconData.icon}
      </View>

      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          R$ {amount.toFixed(2).replace(".", ",")}
        </Text>

        {type !== "total" && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction?.createdAt,
                  `'Última ${cardData.label.toLowerCase()} em' d 'de' MMMM`,
                  {
                    locale: ptBR,
                  }
                )
              : "Nenhuma transação encontrada"}
          </Text>
        )}
      </View>
    </View>
  );
}
