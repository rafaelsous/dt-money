type CardData = {
  label: string;
  bgColor: string;
};

import { TransactionTypes } from "@/enums/TransactionTpes";

import { TransactionCardType } from "@/components/TransactionSummaryCard";

export const CARD_DATA: Record<TransactionCardType, CardData> = {
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
