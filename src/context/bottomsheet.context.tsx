import { createContext, useCallback, useContext, useState } from "react";

type BottomSheetContextType = {
  openBottomSheet: (content: React.ReactNode, index: number) => void;
  closeBottomSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType
);

function BottomSheetContextProvider({
  children,
}: Readonly<React.PropsWithChildren>) {
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, index: number) => {
      setContent(newContent);
    },
    []
  );

  const closeBottomSheet = useCallback(() => {
    setContent(null);
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
}

function useBottomSheetContext() {
  const context = useContext(BottomSheetContext);

  return context;
}

export { BottomSheetContextProvider, useBottomSheetContext };
