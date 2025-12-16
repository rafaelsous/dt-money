import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  CurrencyCircleDollarIcon,
} from "phosphor-react-native";
import { View } from "react-native";

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
  [TransactionTypes.REVENUE]: {
    icon: <ArrowCircleUpIcon size={26} color={colors["accent-brand-light"]} />,
    color: colors["accent-brand-light"],
  },
  [TransactionTypes.EXPENSE]: {
    icon: <ArrowCircleDownIcon size={26} color={colors["accent-red"]} />,
    color: colors["accent-red"],
  },
  total: {
    icon: <CurrencyCircleDollarIcon color={colors.white} />,
    color: colors.white,
  },
};

export function TransactionCard({ type }: Readonly<Props>) {
  const iconData = ICONS[type];

  return <View>{iconData.icon}</View>;
}
