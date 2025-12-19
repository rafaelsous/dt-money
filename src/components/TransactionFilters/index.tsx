import { XIcon } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/shared/colors";

import { useBottomSheetContext } from "@/context/bottomsheet.context";

import { DateFilter } from "../DateFilter";
import { CategoryFilter } from "../CategoryFilter";
import { TypeFilter } from "../TypeFilter";

export function TransactionFilters() {
  const { closeBottomSheet } = useBottomSheetContext();

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
    </View>
  );
}
