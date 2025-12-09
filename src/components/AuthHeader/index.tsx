import { Image, View } from "react-native";

import logo from "@/assets/logo.png";

import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";

export function AuthHeader() {
  const { isKeyboardVisible } = useKeyboardVisible();

  if (isKeyboardVisible) return <></>;

  return (
    <View className="w-full min-h-40 items-center justify-center">
      <Image source={logo} className="w-[225px] h-[48px]" />
    </View>
  );
}
