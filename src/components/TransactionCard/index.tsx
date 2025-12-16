import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  CurrencyCircleDollarIcon,
} from "phosphor-react-native";
import { Text, View } from "react-native";

import { colors } from "@/shared/colors";

import { TransactionTypes } from "@/enums/TransactionTpes";

type TransactionCardType = TransactionTypes | "total";

type IconData = {
  icon: React.ReactNode;
  color: string;
};

type Props = {
  type: TransactionCardType;
  amount: number;
};

const ICONS: Record<TransactionCardType, IconData> = {
  [TransactionTypes.EXPENSE]: {
    icon: <ArrowCircleDownIcon size={26} color={colors["accent-red"]} />,
    color: colors["accent-red"],
  },
  [TransactionTypes.REVENUE]: {
    icon: <ArrowCircleUpIcon size={26} color={colors["accent-brand-light"]} />,
    color: colors["accent-brand-light"],
  },
  total: {
    icon: <CurrencyCircleDollarIcon color={colors.white} />,
    color: colors.white,
  },
};

type CardData = {
  label: string;
  bgColor: string;
};

const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionTypes.EXPENSE]: {
    label: "Saída",
    bgColor: "background-tertiary",
  },
  [TransactionTypes.REVENUE]: {
    label: "Entrada",
    bgColor: "background-tertiary",
  },
  total: {
    label: "Total",
    bgColor: "accent-brand-background-primary",
  },
};

export function TransactionCard({ type, amount }: Readonly<Props>) {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  return (
    <View
      className={`min-w-[280] mr-6 px-8 py-6 justify-between bg-${cardData.bgColor} rounded-md`}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-white">{cardData.label}</Text>
        <View>{iconData.icon}</View>
      </View>

      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          R$ {amount.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
}
