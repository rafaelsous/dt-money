import { Text } from "react-native";
import { useForm } from "react-hook-form";

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
  return <Text className="text-white">Login Form component</Text>;
}
