import clsx from "clsx";
import { IconProps } from "phosphor-react-native";
import { ComponentType, PropsWithChildren } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { colors } from "@/shared/colors";

type Props = TouchableOpacityProps &
  PropsWithChildren & {
    mode?: "fill" | "outline";
    icon?: ComponentType<IconProps>;
    widthFull?: boolean;
  };

export function Button({
  mode = "fill",
  icon: Icon,
  children,
  className,
  widthFull = true,
  ...rest
}: Props) {
  const isFill = mode === "fill";

  return (
    <TouchableOpacity
      className={clsx(
        widthFull && "w-full",
        className,
        "h-button px-5 flex-row items-center bg-accent-brand rounded-xl",
        Icon ? "justify-between" : "justify-center",
        isFill ? "bg-accent-brand" : "bg-transparent border border-accent-brand"
      )}
      activeOpacity={0.7}
      {...rest}
    >
      <Text
        className={clsx(
          "text-base",
          isFill ? "text-white" : "text-accent-brand"
        )}
      >
        {children}
      </Text>

      {Icon && (
        <Icon
          size={24}
          color={isFill ? colors.white : colors["accent-brand"]}
        />
      )}
    </TouchableOpacity>
  );
}
