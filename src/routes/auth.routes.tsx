import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@/screens/Home";

export type PrivateStackParamList = {
  home: undefined;
};

export function AuthRoutes() {
  const { Navigator, Screen } =
    createNativeStackNavigator<PrivateStackParamList>();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
    </Navigator>
  );
}
