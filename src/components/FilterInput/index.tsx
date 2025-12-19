import { useEffect, useState } from "react";
import { FunnelSimpleIcon } from "phosphor-react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { colors } from "@/shared/colors";

import { useTransactionContext } from "@/context/transaction.context";
import { useBottomSheetContext } from "@/context/bottomsheet.context";

import { TransactionFilters } from "../TransactionFilters";

export function FilterInput() {
  const [text, setText] = useState("");

  const { pagination, searchText, setSearchText, fetchTransactions } =
    useTransactionContext();
  const { openBottomSheet } = useBottomSheetContext();

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchText(text);
    }, 500);

    return () => clearTimeout(handler);
  }, [text]);

  useEffect(() => {
    (async () => {
      try {
        await fetchTransactions({ page: 1 });
      } catch (error) {}
    })();
  }, [searchText]);

  return (
    <View className="w-[90%] self-center">
      <View className="w-full mt-4 mb-3 flex-row items-center justify-between">
        <Text className="text-xl text-white font-bold">Transações</Text>
        <Text className="text-base text-gray-700">
          {pagination.totalRows} {pagination.totalRows === 1 ? "item" : "itens"}
        </Text>
      </View>

      <View className="h-16 mb-4 px-4 py-3 flex-row items-center justify-between bg-background-primary">
        <TextInput
          className="flex-1 h-[50] text-lg text-white"
          placeholder="Busque uma transação"
          placeholderTextColor={colors.gray[700]}
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={16}
          onPress={() => openBottomSheet(<TransactionFilters />)}
        >
          <FunnelSimpleIcon size={24} color={colors["accent-brand-light"]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
