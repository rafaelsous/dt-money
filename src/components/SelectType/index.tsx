import clsx from "clsx";
import { Text, TouchableOpacity, View } from "react-native";
import { ArrowCircleDownIcon, ArrowCircleUpIcon } from "phosphor-react-native";

import { colors } from "@/shared/colors";

import { TransactionTypes } from "@/enums/TransactionTpes";

type Props = {
  setTransactionType: (type: TransactionTypes) => void;
  typeId?: number;
};

export function SelectType({ setTransactionType, typeId }: Readonly<Props>) {
  return (
    <View className="mt-8 flex-row justify-between gap-2">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setTransactionType(TransactionTypes.REVENUE)}
        className={clsx(
          "h-[58px] flex-1 flex-row items-center justify-center gap-2 rounded-md",
          typeId === TransactionTypes.REVENUE
            ? "bg-accent-brand-background-primary"
            : "bg-background-tertiary"
        )}
      >
        <ArrowCircleUpIcon
          size={24}
          color={
            typeId === TransactionTypes.REVENUE
              ? colors.white
              : colors["accent-brand-light"]
          }
        />
        <Text className="text-white">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setTransactionType(TransactionTypes.EXPENSE)}
        className={clsx(
          "h-[58px] flex-1 flex-row items-center justify-center gap-2 rounded-md",
          typeId === TransactionTypes.EXPENSE
            ? "bg-accent-red-background-primary"
            : "bg-background-tertiary"
        )}
      >
        <ArrowCircleDownIcon
          size={24}
          color={
            typeId === TransactionTypes.EXPENSE
              ? colors.white
              : colors["accent-red"]
          }
        />
        <Text className="text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  );
}
