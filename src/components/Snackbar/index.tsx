import { Text, View } from "react-native";
import { CheckCircleIcon, WarningCircleIcon } from "phosphor-react-native";

import { colors } from "@/shared/colors";
import { useSnackbarContext } from "@/context/snackbar.context";

export function Snackbar() {
  const { message, type } = useSnackbarContext();

  if (!message || !type) {
    return <></>;
  }

  const isSuccess: boolean = type === "SUCCESS";
  const bgColor = isSuccess ? "bg-accent-brand" : "bg-accent-red";

  return (
    <View
      className={`absolute bottom-10 w-[90%] h-[50px] px-3 flex-row items-center gap-2 self-center ${bgColor} rounded-xl z-10`}
    >
      {isSuccess ? (
        <CheckCircleIcon size={20} color={colors.white} />
      ) : (
        <WarningCircleIcon size={20} color={colors.white} />
      )}
      <Text className="text-base text-white font-semibold">{message}</Text>
    </View>
  );
}
