import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  LockSimpleIcon,
  UserIcon,
} from "phosphor-react-native";
import { Alert, Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";

import { useAuthContext } from "@/context/auth.context";

import { schema } from "./schema";

import { Input } from "../Input";
import { Button } from "../Button";

export type FormRegisterParams = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm() {
  const { goBack } = useNavigation();
  const { handleRegister } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegisterParams>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  async function onSubmit(registerData: FormRegisterParams) {
    try {
      await handleRegister(registerData);
      goBack();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        Alert.alert("Erro", "Não foi possível cadastrar o usuário");
      }
    }
  }

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

        <Button icon={ArrowRightIcon} onPress={handleSubmit(onSubmit)}>
          Cadastrar
        </Button>
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
