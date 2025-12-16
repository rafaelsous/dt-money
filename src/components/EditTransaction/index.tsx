import * as Yup from "yup";
import { useState } from "react";
import { XIcon } from "phosphor-react-native";
import CurrencyInput from "react-native-currency-input";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { colors } from "@/shared/colors";

import { useBottomSheetContext } from "@/context/bottomsheet.context";

import { schema } from "./schema";

import { Button } from "../Button";
import { SelectType } from "../SelectType";
import { SelectCategoryModal } from "../SelectCategoryModal";
import { ErrorMessage } from "../ErrorMessage";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/userErrorHandler";
import { Transaction } from "@/shared/services/dt-money/transaction.service";
import { CreateTransactionDTO } from "../NewTransaction";
import { useSnackbarContext } from "@/context/snackbar.context";

export type UpdateTransactionDTO = {
  id: number;
  typeId: number;
  categoryId: number;
  value: number;
  description: string;
};

type ValidationError = Record<keyof UpdateTransactionDTO, string>;

type Props = {
  transaction: Transaction;
};

export function EditTransaction({
  transaction: transactionToUpdate,
}: Readonly<Props>) {
  const [transaction, setTransaction] = useState<UpdateTransactionDTO>({
    id: transactionToUpdate.id,
    typeId: transactionToUpdate.typeId,
    categoryId: transactionToUpdate.categoryId,
    value: transactionToUpdate.value,
    description: transactionToUpdate.description,
  });
  const [validationErrors, setValidationErrors] = useState<ValidationError>();
  const [isLoading, setIsLoading] = useState(false);

  const { closeBottomSheet } = useBottomSheetContext();
  const { updateTransaction } = useTransactionContext();
  const { notify } = useSnackbarContext();
  const { handleError } = useErrorHandler();

  function setTransactionData(
    key: keyof UpdateTransactionDTO,
    value: string | number
  ) {
    setTransaction((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  async function handleUpdateTransaction() {
    try {
      setIsLoading(true);
      await schema.validate(transaction, {
        abortEarly: false,
      });

      await updateTransaction(transaction);
      closeBottomSheet();
      notify({
        messageType: "SUCCESS",
        message: "Transação atualizado com sucesso!",
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
      } else {
        handleError(error, "Não foi possível cadastrar nova transação.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="py-5 px-8">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Editar transação</Text>

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

        <View className="mt-8">
          <Button disabled={isLoading} onPress={handleUpdateTransaction}>
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              "Atualizar"
            )}
          </Button>
        </View>
      </View>
    </View>
  );
}
