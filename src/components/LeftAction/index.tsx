import { View } from "react-native";
import { PencilSimpleIcon } from "phosphor-react-native";
import { Pressable } from "react-native-gesture-handler";

import { colors } from "@/shared/colors";
import { Transaction } from "@/shared/services/dt-money/transaction.service";

import { useBottomSheetContext } from "@/context/bottomsheet.context";

type Props = {
  transaction: Transaction;
};

export function LeftAction({ transaction }: Readonly<Props>) {
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <Pressable
      onPress={() => {
        openBottomSheet(<></>, 1);
      }}
    >
      <View className="w-[80] h-[140] items-center justify-center bg-accent-blue-dark rounded-l-md">
        <PencilSimpleIcon size={24} color={colors.white} />
      </View>
    </Pressable>
  );
}
