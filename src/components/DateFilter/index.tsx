import clsx from "clsx";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Text, TouchableOpacity, View } from "react-native";

import { formatDateTime } from "@/utils/formatDateTime";
import { useTransactionContext } from "@/context/transaction.context";

export function DateFilter() {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const { filters, handleFilters } = useTransactionContext();

  function handleSelectStartDate(
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) {
    setShowStartDatePicker(false);

    if (event.type === "set" && selectedDate) {
      handleFilters({
        key: "from",
        value: selectedDate,
      });
    }
  }

  function handleSelectEndDate(
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) {
    setShowEndDatePicker(false);

    if (event.type === "set" && selectedDate) {
      handleFilters({
        key: "to",
        value: selectedDate,
      });
    }
  }

  return (
    <View className="gap-6">
      <View className="gap-6">
        <Text className="text-lg text-gray-700">Data</Text>

        <View className="flex-row items-center justify-between">
          <View className="w-[48%]">
            <TouchableOpacity
              activeOpacity={0.7}
              className="p-2 border-b border-gray-800 rounded-md"
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text
                className={clsx(
                  "text-lg",
                  filters.from ? "text-white" : "text-gray-700"
                )}
              >
                {filters.from
                  ? formatDateTime(filters.from, "DD/MM/YYYY")
                  : "De"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-[48%]">
            <TouchableOpacity
              activeOpacity={0.7}
              className="p-2 border-b border-gray-800 rounded-md"
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text
                className={clsx(
                  "text-lg",
                  filters.to ? "text-white" : "text-gray-700"
                )}
              >
                {filters.to ? formatDateTime(filters.to, "DD/MM/YYYY") : "Até"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {showStartDatePicker && (
          <DateTimePicker
            mode="date"
            locale="pt_BR"
            display="default"
            value={filters.from ?? new Date()}
            onChange={handleSelectStartDate}
          />
        )}

        {showEndDatePicker && (
          <DateTimePicker
            mode="date"
            locale="pt_BR"
            display="default"
            value={filters.to ?? new Date()}
            onChange={handleSelectEndDate}
          />
        )}
      </View>
    </View>
  );
}
