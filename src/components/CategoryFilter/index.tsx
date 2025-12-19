import { CheckIcon } from "phosphor-react-native";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/shared/colors";

import { useTransactionContext } from "@/context/transaction.context";

export function CategoryFilter() {
  const { categories, filters, handleCategoryFilter } = useTransactionContext();

  return (
    <View>
      <Text className="mb-5 text-base text-gray-700 font-medium">
        Categoria
      </Text>

      {categories.map(({ id, name }) => (
        <TouchableOpacity
          key={id}
          activeOpacity={0.7}
          className="py-2 flex-row items-center gap-3"
          onPress={() => {
            handleCategoryFilter(id);
          }}
        >
          <Pressable
            className={`w-6 h-6 items-center justify-center ${
              filters.categoryIds[id] ? "bg-accent-brand" : "transparent"
            } border border-gray-700 rounded-md`}
            onPress={() => {
              handleCategoryFilter(id);
            }}
          >
            {filters.categoryIds[id] && (
              <CheckIcon size={16} color={colors.white} weight="bold" />
            )}
          </Pressable>

          <Text className="text-lg text-white">{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
