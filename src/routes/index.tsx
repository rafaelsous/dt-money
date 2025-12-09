import { View } from "react-native";
import { useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuthContext } from "@/context/auth.context";

import { Loading } from "@/screens/Loading";

export function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuthContext();

  const CurrentRoutes = useCallback(() => {
    if (isLoading) {
      return <Loading setIsLoading={setIsLoading} />;
    }

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
