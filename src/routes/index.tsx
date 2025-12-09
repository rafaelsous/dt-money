import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const [user, setUser] = useState(undefined);

  const CurrentRoutes = useCallback(() => {
    return user ? <AuthRoutes /> : <AppRoutes />;
  }, [user]);

  return (
    <View className="flex-1 bg-background-primary">
      <NavigationContainer>
        <CurrentRoutes />
      </NavigationContainer>
    </View>
  );
}
