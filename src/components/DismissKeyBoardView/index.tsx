import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, ScrollView } from "react-native";

import { useKeyboardOffset } from "@/shared/hooks/useKeyboardOffset";
import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";

export function DismissKeyboardView({ children }: Readonly<PropsWithChildren>) {
  const keyboardOffset = useKeyboardOffset({
    openOffset: 0,
    closedOffset: -60,
  });
  const { keyboardHeight } = useKeyboardVisible();

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={keyboardOffset}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            // paddingBottom: keyboardHeight + 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
