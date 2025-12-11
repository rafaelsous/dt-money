import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/AppHeader";

export function Home() {
  return (
    <SafeAreaView className="px-8 py-12 flex-1 gap-10 bg-background-primary">
      <AppHeader />

      <Text className="text-base font-bold text-white">Home Screen</Text>
    </SafeAreaView>
  );
}
