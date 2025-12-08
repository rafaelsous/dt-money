import { View } from "react-native";

import { LoginForm } from "@/components/LoginForm";
import { AuthHeader } from "@/components/AuthHeader";
import { DismissKeyboardView } from "@/components/DismissKeyBoardView";

export function Login() {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />

        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
}
