import clsx from "clsx";
import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { IconProps } from "phosphor-react-native";
import { ComponentType, useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { colors } from "@/shared/colors";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

type InputProps<T extends FieldValues> = TextInputProps & {
  label?: string;
  control: Control<T>;
  name: Path<T>;
  leftIcon?: ComponentType<IconProps>;
};

export function Input<T extends FieldValues>({
  label,
  control,
  name,
  leftIcon: LeftIcon,
  secureTextEntry,
  ...rest
}: InputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const [showText, setShowText] = useState(secureTextEntry);
  const inputRef = useRef<TextInput>(null);

  function onFocus() {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused);
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        console.log(error);

        return (
          <View className="w-full">
            {label && (
              <Text
                className={clsx(
                  "mt-3 mb-2 text-base uppercase",
                  isFocused ? "text-accent-brand" : "text-gray-600"
                )}
              >
                {label}
              </Text>
            )}

            <Pressable className="h-16 px-3 py-2 flex-row items-center justify-between gap-2 border-b-[1px] border-gray-600">
              {LeftIcon && (
                <LeftIcon
                  size={24}
                  color={isFocused ? colors["accent-brand"] : colors.gray[600]}
                />
              )}

              <TextInput
                ref={inputRef}
                className="flex-1 text-base text-gray-500"
                value={value}
                onChangeText={onChange}
                onFocus={onFocus}
                onEndEditing={onFocus}
                secureTextEntry={showText}
                placeholderTextColor={colors.gray[700]}
                {...rest}
              />

              {secureTextEntry && (
                <TouchableOpacity
                  hitSlop={16}
                  activeOpacity={0.7}
                  onPress={() => setShowText(!showText)}
                >
                  <MaterialIcons
                    name={showText ? "visibility" : "visibility-off"}
                    size={24}
                    color={colors.gray[600]}
                  />
                </TouchableOpacity>
              )}
            </Pressable>
          </View>
        );
      }}
    />
  );
}
