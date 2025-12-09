import { useForm } from "react-hook-form";
import { Text, useWindowDimensions, View } from "react-native";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  LockSimpleIcon,
  UserIcon,
} from "phosphor-react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { PublicStackParamList } from "@/routes/app.routes";

import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";

import { Input } from "../Input";
import { Button } from "../Button";

export type RegisterFormParams = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm() {
  const { goBack } = useNavigation();
  const keyboardVisible = useKeyboardVisible();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormParams>();

  return (
    <View className="gap-16">
      <View className="gap-11">
        <Input
          label="Nome"
          control={control}
          name="name"
          placeholder="Seu nome completo"
          leftIcon={UserIcon}
        />

        <Input
          label="Email"
          control={control}
          name="email"
          placeholder="Digite seu email"
          keyboardType="email-address"
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

        <Input
          label="Senha"
          control={control}
          name="confirmPassword"
          placeholder="Confirme sua senha"
          leftIcon={LockSimpleIcon}
          secureTextEntry
        />

        <Button icon={ArrowRightIcon}>Cadastrar</Button>
      </View>

      <View className="gap-5">
        <Text className="text-base text-gray-300">Já tem uma conta?</Text>

        <Button mode="outline" icon={ArrowRightIcon} onPress={goBack}>
          Acessar
        </Button>
      </View>
    </View>
  );
}
