import { useState } from "react";
import { XIcon } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/shared/colors";

import { useBottomSheetContext } from "@/context/bottomsheet.context";

type CreateTransactionDTO = {
  typeId: number;
  categoryId: number;
  value: number;
  description: string;
};

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();
  const [transaction, setTransaction] = useState<CreateTransactionDTO>({
    typeId: 0,
    categoryId: 0,
    value: 0,
    description: "",
  });

  return (
    <View className="py-5 px-8">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Nova Transação</Text>

        <TouchableOpacity activeOpacity={0.7} onPress={closeBottomSheet}>
          <XIcon size={24} color={colors.gray[700]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
