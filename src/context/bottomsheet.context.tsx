import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import { colors } from "@/shared/colors";

type BottomSheetContextType = {
  openBottomSheet: (content: React.ReactNode) => void;
  closeBottomSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType
);

function BottomSheetContextProvider({
  children,
}: Readonly<React.PropsWithChildren>) {
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const insets = useSafeAreaInsets();

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode) => {
      bottomSheetRef.current?.close();
      setContent(newContent);

      requestAnimationFrame(() => {
        bottomSheetRef.current?.expand();
      });
    },
    [content]
  );

  const closeBottomSheet = useCallback(() => {
    setContent(null);
    bottomSheetRef.current?.close();
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enableDynamicSizing
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: colors["background-secondary"],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 9,
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
            opacity={0.7}
          />
        )}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom }}
        >
          {content}
        </BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
}

function useBottomSheetContext() {
  return useContext(BottomSheetContext);
}

export { BottomSheetContextProvider, useBottomSheetContext };
