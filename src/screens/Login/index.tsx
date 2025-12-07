/** biome-ignore-all assist/source/organizeImports: <explanation> */
import { Button, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { PublicStackParamList } from "@/routes/app.routes";

import { DismissKeyboardView } from "@/components/DismissKeyBoardView";

export function Login() {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<PublicStackParamList>>();

  return (
    <DismissKeyboardView>
      <Text className="text-xl font-bold">Login Screen</Text>

      <TextInput className="w-full bg-gray-500" />

      <Button title="Register" onPress={() => navigate("register")} />
    </DismissKeyboardView>
  );
}
