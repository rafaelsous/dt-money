import { useCallback } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuthContext } from "@/context/auth.context";

export function Routes() {
  const { user, token } = useAuthContext();

  const CurrentRoutes = useCallback(() => {
    return user && token ? <AuthRoutes /> : <AppRoutes />;
  }, [user, token]);

  return (
    <View className="flex-1 bg-background-primary">
      <NavigationContainer>
        <CurrentRoutes />
      </NavigationContainer>
    </View>
  );
}
