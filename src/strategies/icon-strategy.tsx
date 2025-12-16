import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  CurrencyCircleDollarIcon,
} from "phosphor-react-native";

import { colors } from "@/shared/colors";

import { TransactionTypes } from "@/enums/TransactionTpes";

import { TransactionCardType } from "@/components/TransactionSummaryCard";

type IconData = {
  icon: React.ReactNode;
};

export const ICONS: Record<TransactionCardType, IconData> = {
  [TransactionTypes.EXPENSE]: {
    icon: <ArrowCircleDownIcon size={26} color={colors["accent-red"]} />,
  },
  [TransactionTypes.REVENUE]: {
    icon: <ArrowCircleUpIcon size={26} color={colors["accent-brand-light"]} />,
  },
  total: {
    icon: <CurrencyCircleDollarIcon color={colors.white} />,
  },
};
