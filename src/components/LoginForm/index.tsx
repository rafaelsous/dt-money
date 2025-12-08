import { View } from "react-native";
import { useForm } from "react-hook-form";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  LockSimpleIcon,
} from "phosphor-react-native";

import { Input } from "../Input";
import { Button } from "../Button";

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

      <Button mode="fill" icon={ArrowRightIcon}>
        Logar
      </Button>

      <Button mode="outline" icon={ArrowRightIcon}>
        Cadastrar
      </Button>
    </View>
  );
}
