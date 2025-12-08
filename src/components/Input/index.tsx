import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { colors } from "@/shared/colors";

type InputProps<T extends FieldValues> = TextInputProps & {
  label?: string;
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
};

export function Input<T extends FieldValues>({
  label,
  control,
  name,
  leftIconName,
  ...rest
}: InputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View className="w-full">
          {label && <Text className="text-white">{label}</Text>}

          <TouchableOpacity className="h-16 px-3 py-2 flex-row items-center justify-between border-b-[1px] border-gray-600">
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholderTextColor={colors.gray[700]}
              {...rest}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
