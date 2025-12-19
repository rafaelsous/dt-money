import { CheckIcon } from "phosphor-react-native";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/shared/colors";

import { TransactionTypes } from "@/enums/TransactionTpes";

import { useTransactionContext } from "@/context/transaction.context";

export function TypeFilter() {
  const { filters, handleFilters } = useTransactionContext();

  function handleSelectType(typeId: TransactionTypes) {
    handleFilters({
      key: "typeId",
      value: typeId,
    });
  }

  return (
    <View className="">
      <Text className="mb-5 text-base font-medium text-gray-700">Tipo</Text>

      <TouchableOpacity
        activeOpacity={0.7}
        className="py-2 flex-row items-center gap-3"
        onPress={() => {
          handleSelectType(TransactionTypes.REVENUE);
        }}
      >
        <Pressable
          className={`w-6 h-6 items-center justify-center ${
            filters.typeId === TransactionTypes.REVENUE
              ? "bg-accent-brand"
              : "transparent"
          } border border-gray-700 rounded-md`}
          onPress={() => {
            handleSelectType(TransactionTypes.REVENUE);
          }}
        >
          {filters.typeId === TransactionTypes.REVENUE && (
            <CheckIcon size={16} color={colors.white} weight="bold" />
          )}
        </Pressable>

        <Text className="text-lg text-white">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        className="py-2 flex-row items-center gap-3"
        onPress={() => {
          handleSelectType(TransactionTypes.EXPENSE);
        }}
      >
        <Pressable
          className={`w-6 h-6 items-center justify-center ${
            filters.typeId === TransactionTypes.EXPENSE
              ? "bg-accent-brand"
              : "transparent"
          } border border-gray-700 rounded-md`}
          onPress={() => {
            handleSelectType(TransactionTypes.EXPENSE);
          }}
        >
          {filters.typeId === TransactionTypes.EXPENSE && (
            <CheckIcon size={16} color={colors.white} weight="bold" />
          )}
        </Pressable>

        <Text className="text-lg text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  );
}
