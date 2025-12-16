import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { WarningCircleIcon, XIcon } from "phosphor-react-native";

import { colors } from "@/shared/colors";
import { Button } from "../Button";

type Props = {
  visible: boolean;
  isLoading: boolean;
  hideModal: () => void;
  handleRemoveTransaction: () => void;
};

export function DeleteModal({
  visible,
  isLoading,
  hideModal,
  handleRemoveTransaction,
}: Readonly<Props>) {
  return (
    <View className="flex-1 absolute">
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="w-[90%] h-[322] m-5 p-8 bg-background-secondary rounded-2xl shadow-lg z-2">
                <View className="w-full p-3 pb-6 flex-row items-center gap-4 border-b border-gray-800">
                  <WarningCircleIcon size={22} color={colors.gray[400]} />
                  <Text className="flex-1 text-xl text-white">
                    Apagar transação?
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={hideModal}
                    hitSlop={16}
                  >
                    <XIcon size={20} color={colors.gray[700]} />
                  </TouchableOpacity>
                </View>

                <View className="p-3 flex-1 justify-center border-b border-gray-800">
                  <Text className="text-base text-gray-500 leading-8">
                    Tem certeza de que deseja apagar esta transação? Esta ação
                    não pode ser desfeita.
                  </Text>
                </View>

                <View className="w-full pt-6 flex-row items-center justify-end gap-4">
                  <Button
                    style={{ width: "47%" }}
                    mode="outline"
                    onPress={hideModal}
                  >
                    Cancelar
                  </Button>

                  <Button
                    style={{
                      width: "47%",
                      backgroundColor: colors["accent-red-background-primary"],
                    }}
                    onPress={handleRemoveTransaction}
                  >
                    {isLoading ? <ActivityIndicator /> : "Apagar"}
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
