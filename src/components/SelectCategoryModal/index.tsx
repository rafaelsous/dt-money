import { useTransactionContext } from "@/context/transaction.context";
import clsx from "clsx";
import { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/shared/colors";
import { CheckIcon } from "phosphor-react-native";

type Props = {
  selectedCategory: number;
  onSelect: (categoryId: number) => void;
};

export function SelectCategoryModal({
  selectedCategory,
  onSelect,
}: Readonly<Props>) {
  const [showModal, setShowModal] = useState(false);

  const { categories } = useTransactionContext();

  function handleToggleShowModal() {
    setShowModal((prev) => !prev);
  }

  function handleSelectOption(categoryId: number) {
    onSelect(categoryId);
    setShowModal(false);
  }

  const selected = useMemo(
    () => categories.find(({ id }) => selectedCategory === id),
    [categories, selectedCategory]
  );

  return (
    <>
      <TouchableOpacity
        className="h-[50] px-4 justify-center gap-2 bg-background-primary rounded-md"
        activeOpacity={0.7}
        onPress={handleToggleShowModal}
      >
        <Text
          className={clsx("text-lg", selected ? "text-white" : "text-gray-700")}
        >
          {selected?.name || "Categoria"}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <Pressable
          className="flex-1 bg-black/50"
          onPress={handleToggleShowModal}
        />

        <View className="absolute inset-0 items-center justify-end">
          <Pressable
            onPress={() => {}}
            className="w-full px-8 pt-6 pb-12 gap-8 bg-background-secondary rounded-xl"
          >
            <Text className="text-lg text-white">Selecione uma categoria:</Text>

            <FlatList
              data={categories}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-4 flex-row items-center gap-3 bg-gray-800 rounded-lg"
                  activeOpacity={0.7}
                  onPress={() => {
                    handleSelectOption(item.id);
                  }}
                >
                  <Pressable
                    className={`w-6 h-6 items-center justify-center ${
                      selected?.id === item.id
                        ? "bg-accent-brand"
                        : "transparent"
                    } border border-gray-700 rounded-md`}
                    onPress={() => {
                      handleSelectOption(item.id);
                    }}
                  >
                    {selected?.id === item.id && (
                      <CheckIcon size={16} color={colors.white} weight="bold" />
                    )}
                  </Pressable>

                  <Text className="text-lg text-white">{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ gap: 8 }}
            />
          </Pressable>
        </View>
      </Modal>
    </>
  );
}
