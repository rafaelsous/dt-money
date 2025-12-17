import { Text } from "react-native";

export function EmptyList() {
  return (
    <Text className="p-4 text-lg text-gray-700 text-center">
      Nenhuma transação encontrada.
    </Text>
  );
}
