import { Text, View } from "react-native";

import { useAuthContext } from "@/context/auth.context";

import { Button } from "@/components/Button";
import { SignOutIcon } from "phosphor-react-native";

export function Home() {
  const { handleLogout } = useAuthContext();

  return (
    <View className="px-8 py-12 flex-1 items-center justify-center gap-5 bg-background-primary">
      <Text className="text-base font-bold text-white">Home Screen</Text>

      <Button icon={SignOutIcon} onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
}
