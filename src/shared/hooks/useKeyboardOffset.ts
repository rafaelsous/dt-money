import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

type Options = {
  /** Offset aplicado quando o teclado está aberto */
  openOffset?: number;
  /** Offset aplicado quando o teclado fecha */
  closedOffset?: number;
};

export function useKeyboardOffset(
  options: Options = {
    openOffset: 40,
    closedOffset: 0,
  }
) {
  const { openOffset = 40, closedOffset = 0 } = options;

  const [offset, setOffset] = useState<number>(
    Platform.OS === "ios" ? openOffset : 0
  );

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      setOffset(openOffset);
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setOffset(closedOffset);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, [openOffset, closedOffset]);

  return offset;
}
