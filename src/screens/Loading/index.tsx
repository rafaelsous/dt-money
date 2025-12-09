import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthContext } from "@/context/auth.context";

import logo from "@/assets/logo.png";
import { colors } from "@/shared/colors";

type Props = {
  setIsLoading: (value: boolean) => void;
};

export function Loading({ setIsLoading }: Readonly<Props>) {
  const { restoreUserSession, handleLogout } = useAuthContext();

  async function redirectUser() {
    try {
      const user = await restoreUserSession();

      if (!user) {
        await handleLogout();
      }
    } catch (error) {
      console.log(error);
      await handleLogout();
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    redirectUser();
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background-primary">
      <View className="gap-5">
        <Image source={logo} className="w-[225px] h-[48px]" />
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    </SafeAreaView>
  );
}
