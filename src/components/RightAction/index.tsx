import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { TrashIcon } from "phosphor-react-native";

import { colors } from "@/shared/colors";

import { DeleteModal } from "../DeleteModal";

export function RightAction() {
  const [modalVisible, setModalVisible] = useState(false);

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
      />
    </>
  );
}
