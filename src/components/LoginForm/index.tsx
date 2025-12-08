import { useForm } from "react-hook-form";

import { Input } from "../Input";

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
    <Input
      label="Email"
      control={control}
      name="email"
      placeholder="example@mail.com"
    />
  );
}
