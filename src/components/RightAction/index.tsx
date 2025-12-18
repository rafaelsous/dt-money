import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { TrashIcon } from "phosphor-react-native";

import { colors } from "@/shared/colors";

import { useErrorHandler } from "@/shared/hooks/userErrorHandler";

import { useSnackbarContext } from "@/context/snackbar.context";
import { useTransactionContext } from "@/context/transaction.context";

import { DeleteModal } from "../DeleteModal";

type Props = {
  transactionId: number;
};

export function RightAction({ transactionId }: Readonly<Props>) {
  const [modalVisible, setModalVisible] = useState(false);

  const { notify } = useSnackbarContext();
  const { handleError } = useErrorHandler();
  const { deleteTransaction, loadings, handleLoadings } =
    useTransactionContext();

  async function handleRemoveTransaction() {
    try {
      handleLoadings({
        key: "refresh",
        value: true,
      });

      await deleteTransaction(transactionId);

      setModalVisible(false);
      notify({
        messageType: "SUCCESS",
        message: "Transação apagada com sucesso",
      });
    } catch (error) {
      handleError(error, "Não foi possível excluir a transação.");
    } finally {
      handleLoadings({
        key: "refresh",
        value: false,
      });
    }
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
        className="w-[80] h-[140] items-center justify-center bg-accent-red-background-primary rounded-r-md"
      >
        <TrashIcon size={24} color={colors.white} />
      </TouchableOpacity>

      <DeleteModal
        visible={modalVisible}
        hideModal={() => setModalVisible(false)}
        handleRemoveTransaction={handleRemoveTransaction}
        isLoading={loadings.refresh}
      />
    </>
  );
}
