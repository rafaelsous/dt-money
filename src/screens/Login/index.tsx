import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PublicStackParamList } from "@/routes";

export function Login() {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<PublicStackParamList>>();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">Login Screen</Text>

      <Button title="Register" onPress={() => navigate("register")} />
    </View>
  );
}
