import * as Yup from "yup";
import { useState } from "react";
import { XIcon } from "phosphor-react-native";
import CurrencyInput from "react-native-currency-input";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { colors } from "@/shared/colors";

import { useBottomSheetContext } from "@/context/bottomsheet.context";

import { schema } from "./schema";

import { Button } from "../Button";
import { SelectType } from "../SelectType";
import { SelectCategoryModal } from "../SelectCategoryModal";
import { ErrorMessage } from "../ErrorMessage";

type CreateTransactionDTO = {
  typeId: number;
  categoryId: number;
  value: number;
  description: string;
};

type ValidationError = Record<keyof CreateTransactionDTO, string>;

export function NewTransaction() {
  const [transaction, setTransaction] = useState<CreateTransactionDTO>({
    typeId: 0,
    categoryId: 0,
    value: 0,
    description: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationError>();

  const { closeBottomSheet } = useBottomSheetContext();

  function setTransactionData(
    key: keyof CreateTransactionDTO,
    value: string | number
  ) {
    setTransaction((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  async function handleNewTransaction() {
    try {
      await schema.validate(transaction, {
        abortEarly: false,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidationError;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof CreateTransactionDTO] = err.message;
          }
        });

        setValidationErrors(errors);
      }
    }
  }

  return (
    <View className="py-5 px-8">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Nova Transação</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={16}
          onPress={closeBottomSheet}
        >
          <XIcon size={24} color={colors.gray[700]} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 my-8">
        <BottomSheetTextInput
          className="h-[50px] py-2 px-4 bg-background-primary rounded-[6px] text-lg text-white"
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(value) => setTransactionData("description", value)}
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}

        <CurrencyInput
          className="h-[50px] mt-8 py-2 px-4 bg-background-primary rounded-[6px] text-lg text-white"
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
          renderTextInput={(props) => <BottomSheetTextInput {...props} />}
        />
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />
        {validationErrors?.categoryId && (
          <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
        )}

        <SelectType
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
        />
        {validationErrors?.typeId && (
          <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
        )}

        <View className="mt-8 mb-4">
          <Button onPress={handleNewTransaction}>Cadastrar</Button>
        </View>
      </View>
    </View>
  );
}
