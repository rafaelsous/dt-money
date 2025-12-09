import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";

export type PublicStackParamList = {
  login: undefined;
  register: undefined;
};

export function AppRoutes() {
  const { Navigator, Screen } =
    createNativeStackNavigator<PublicStackParamList>();

  return (
    <Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
    </Navigator>
  );
}
