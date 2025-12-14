import { useState } from "react";
import { XIcon } from "phosphor-react-native";
import CurrencyInput from "react-native-currency-input";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { colors } from "@/shared/colors";

import { useBottomSheetContext } from "@/context/bottomsheet.context";

import { SelectType } from "../SelectType";
import { SelectCategoryModal } from "../SelectCategoryModal";

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

  function setTransactionData(
    key: keyof CreateTransactionDTO,
    value: string | number
  ) {
    setTransaction((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  return (
    <View className="py-5 px-8">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Nova Transação</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={16}
          onPress={closeBottomSheet}
        >
          <XIcon size={24} color={colors.gray[700]} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 my-8 gap-8">
        <BottomSheetTextInput
          className="h-[50px] py-2 px-4 bg-background-primary rounded-[6px] text-lg text-white"
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(value) => setTransactionData("description", value)}
        />

        <CurrencyInput
          className="h-[50px] py-2 px-4 bg-background-primary rounded-[6px] text-lg text-white"
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
          renderTextInput={(props) => <BottomSheetTextInput {...props} />}
        />

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />

        <SelectType
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
        />
      </View>
    </View>
  );
}
