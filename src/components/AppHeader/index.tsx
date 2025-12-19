import { SignOutIcon } from "phosphor-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

import logo from "@/assets/logo.png";

import { colors } from "@/shared/colors";

import { useAuthContext } from "@/context/auth.context";
import { useBottomSheetContext } from "@/context/bottomsheet.context";

import { Button } from "../Button";
import { NewTransaction } from "../NewTransaction";

export function AppHeader() {
  const { handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <View className="w-full flex-row px-8 py-12 justify-between bg-background-primary">
      <View className="gap-2">
        <Image source={logo} className="w-[117px] h-[25px]" />

        <TouchableOpacity
          className="flex-row items-center gap-2"
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <SignOutIcon size={16} color={colors.gray[700]} />
          <Text className="text-base text-gray-700">Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <Button
        widthFull={false}
        className="w-[150] h-[50]"
        onPress={() => {
          openBottomSheet(<NewTransaction />);
        }}
      >
        <Text className="font-bold text-sm">Nova transação</Text>
      </Button>
    </View>
  );
}
