import { View } from "react-native";

import { AuthHeader } from "@/components/AuthHeader";
import { RegisterForm } from "@/components/RegisterForm";
import { DismissKeyboardView } from "@/components/DismissKeyBoardView";

export function Register() {
  return (
    <DismissKeyboardView>
      <View className="flex-1 px-8 pt-4 pb-12">
        <AuthHeader />

        <RegisterForm />
      </View>
    </DismissKeyboardView>
  );
}
