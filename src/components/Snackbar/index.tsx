import { Text, View } from "react-native";
import { CheckCircleIcon, WarningCircleIcon } from "phosphor-react-native";

import { colors } from "@/shared/colors";
import { useSnackbarContext } from "@/context/snackbar.context";
import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";

export function Snackbar() {
  const { message, type } = useSnackbarContext();
  const { isKeyboardVisible } = useKeyboardVisible();

  if (!message || !type) {
    return <></>;
  }

  const isSuccess: boolean = type === "SUCCESS";
  const bgColor = isSuccess ? "bg-accent-brand" : "bg-accent-red";

  return (
    <View
      className={`w-[90%] h-[50px] px-3 absolute ${
        isKeyboardVisible ? "top-16" : "bottom-10"
      } flex-row items-center gap-2 self-center rounded-xl ${bgColor} z-10`}
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
