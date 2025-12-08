import { useForm } from "react-hook-form";

import { Input } from "../Input";
import { View } from "react-native";

export type FormLoginParams = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>();
  return (
    <View className="gap-4">
      <Input
        label="Email"
        control={control}
        name="email"
        placeholder="Digite seu email"
        leftIconName="mail-outline"
      />

      <Input
        label="Senha"
        control={control}
        name="password"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />
    </View>
  );
}
