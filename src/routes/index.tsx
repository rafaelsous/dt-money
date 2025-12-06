import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";
import { View } from "react-native";

export type PublicStackParamList = {
  login: undefined;
  register: undefined;
};

export const NavigationRoutes = () => {
  const { Navigator, Screen } =
    createNativeStackNavigator<PublicStackParamList>();

  return (
    <View className="flex-1 bg-white">
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="login" component={Login} />
          <Screen name="register" component={Register} />
        </Navigator>
      </NavigationContainer>
    </View>
  );
};
