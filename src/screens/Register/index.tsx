import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Register() {
  const { goBack } = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">Register Screen</Text>

      <Button title="Back" onPress={goBack} />
    </View>
  );
}
