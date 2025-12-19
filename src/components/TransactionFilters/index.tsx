import { XIcon } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/shared/colors";

import { useErrorHandler } from "@/shared/hooks/userErrorHandler";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { useTransactionContext } from "@/context/transaction.context";

import { Button } from "../Button";
import { DateFilter } from "../DateFilter";
import { TypeFilter } from "../TypeFilter";
import { CategoryFilter } from "../CategoryFilter";

export function TransactionFilters() {
  const { closeBottomSheet } = useBottomSheetContext();
  const { handleError } = useErrorHandler();
  const { resetFilters, fetchTransactions, handleLoadings } =
    useTransactionContext();

  async function handleFetchTransactions() {
    try {
      handleLoadings({ key: "refresh", value: true });

      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Não foi possível filtrar as transações.");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  }

  async function handleResetFilters() {
    try {
      handleLoadings({ key: "refresh", value: true });
      await resetFilters();
    } catch (error) {
      handleError(error, "Não foi possível limpar filtros das transações.");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  }

  return (
    <View className="p-6 flex-1 gap-6 bg-gray[1000]">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg text-white font-bold">Filtrar transações</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={16}
          onPress={closeBottomSheet}
        >
          <XIcon size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>

      <DateFilter />

      <CategoryFilter />

      <TypeFilter />

      <View className="mt-8 flex-row items-center justify-between gap-4">
        <Button
          widthFull={false}
          className="flex-1"
          mode="outline"
          onPress={handleResetFilters}
        >
          Limpar filtro
        </Button>

        <Button
          className="flex-1"
          widthFull={false}
          onPress={handleFetchTransactions}
        >
          Filtrar
        </Button>
      </View>
    </View>
  );
}
