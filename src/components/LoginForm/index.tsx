import {
  ArrowRightIcon,
  EnvelopeIcon,
  LockSimpleIcon,
} from "phosphor-react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ActivityIndicator,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { PublicStackParamList } from "@/routes/app.routes";

import { useAuthContext } from "@/context/auth.context";

import { colors } from "@/shared/colors";
import { useErrorHandler } from "@/shared/hooks/userErrorHandler";
import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";

import { schema } from "./schema";

import { Input } from "../Input";
import { Button } from "../Button";

export type FormLoginParams = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { navigate } = useNavigation<NavigationProp<PublicStackParamList>>();
  const { isKeyboardVisible } = useKeyboardVisible();
  const { handleAuthenticate } = useAuthContext();
  const { handleError } = useErrorHandler();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { height } = useWindowDimensions();
  const keyboardVisibleHeight = Math.floor(height * 0.063);
  const keyboardHideHeight = Math.floor(height * 0.289);

  console.log({ isKeyboardVisible, keyboardHideHeight, keyboardVisibleHeight });

  async function onSubmit(loginData: FormLoginParams) {
    try {
      await handleAuthenticate(loginData);
    } catch (error) {
      handleError(error, "Não foi possível fazer login.");
    }
  }

  return (
    <View
      style={{
        gap: isKeyboardVisible ? keyboardVisibleHeight : keyboardHideHeight,
      }}
    >
      <View className="gap-11">
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

        <Button
          icon={ArrowRightIcon}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? <ActivityIndicator color={colors.white} /> : "Logar"}
        </Button>
      </View>

      <View className="gap-5">
        <Text className="text-base text-gray-300">
          Ainda não tem uma conta?
        </Text>

        <Button
          mode="outline"
          icon={ArrowRightIcon}
          onPress={() => navigate("register")}
        >
          Cadastrar
        </Button>
      </View>
    </View>
  );
}
