import { createContext, PropsWithChildren, useState } from "react";

type SnackbarMessageType = "ERROR" | "SUCCESS";

type NotifyMessageParams = {
  message: string;
  messageType: SnackbarMessageType;
};

type SnackbarContextType = {
  message: string | null;
  type: SnackbarMessageType | null;
  notify: (params: NotifyMessageParams) => void;
};

const SnackbarContext = createContext<SnackbarContextType>(
  {} as SnackbarContextType
);

function SnackbarContextProvider({ children }: Readonly<PropsWithChildren>) {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<SnackbarMessageType | null>(null);

  function notify({ message, messageType }: NotifyMessageParams) {
    setMessage(message);
    setType(messageType);

    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
  }

  return (
    <SnackbarContext.Provider
      value={{
        message,
        type,
        notify,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}

export { SnackbarContextProvider };
