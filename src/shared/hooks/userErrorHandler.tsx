import { useSnackbarContext } from "@/context/snackbar.context";

import { AppError } from "@/helpers/AppError";

export function useErrorHandler() {
  const { notify } = useSnackbarContext();

  function handleError(error: unknown, defaultMessage?: string) {
    const isAppError = error instanceof AppError;

    const message = isAppError
      ? error.message
      : defaultMessage || "Ocorreu um erro inesperado. Tente novamente.";

    notify({
      message,
      messageType: "ERROR",
    });
  }

  return {
    handleError,
  };
}
