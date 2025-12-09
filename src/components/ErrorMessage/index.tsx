import { PropsWithChildren } from "react";
import { Text, View } from "react-native";
import { WarningCircleIcon } from "phosphor-react-native";

import { colors } from "@/shared/colors";

export function ErrorMessage({ children }: Readonly<PropsWithChildren>) {
  return (
    <View className="py-2 flex-row items-center gap-1">
      <WarningCircleIcon size={16} color={colors["accent-red"]} />

      <Text className="text-accent-red">{children}</Text>
    </View>
  );
}
