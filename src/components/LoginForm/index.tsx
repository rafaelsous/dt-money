import { Text, useWindowDimensions, View } from "react-native";
import { useForm } from "react-hook-form";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  LockSimpleIcon,
} from "phosphor-react-native";

import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";

import { Input } from "../Input";
import { Button } from "../Button";

export type FormLoginParams = {
  email: string;
  password: string;
};

export function LoginForm() {
  const keyboardVisible = useKeyboardVisible();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>();

  const { height } = useWindowDimensions();
  const keyboardVisibleHeight = Math.floor(height * 0.063);
  const keyboardHideHeight = Math.floor(height * 0.289);

  return (
    <View
      style={{
        gap: keyboardVisible ? keyboardVisibleHeight : keyboardHideHeight,
      }}
    >
      <View className="gap-11">
        <Input
          label="Email"
          control={control}
          name="email"
          placeholder="Digite seu email"
          leftIcon={EnvelopeIcon}
        />

        <Input
          label="Senha"
          control={control}
          name="password"
          placeholder="Sua senha"
          leftIcon={LockSimpleIcon}
          secureTextEntry
        />

        <Button icon={ArrowRightIcon}>Logar</Button>
      </View>

      <View className="gap-5">
        <Text className="text-base text-gray-300">
          Ainda não tem uma conta?
        </Text>

        <Button mode="outline" icon={ArrowRightIcon}>
          Cadastrar
        </Button>
      </View>
    </View>
  );
}
