import clsx from "clsx";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Text, TouchableOpacity, View } from "react-native";

import { formatDateTime } from "@/utils/formatDateTime";

export function DateFilter() {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  function handleSelectStartDate(
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) {
    setShowStartDatePicker(false);
  }

  function handleSelectEndDate(
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) {
    setShowEndDatePicker(false);
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
                  1 === 1 ? "text-white" : "text-gray-700"
                )}
              >
                {1 === 1 ? formatDateTime(new Date(), "DD/MM/YYYY") : "De"}
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
                  1 === 1 ? "text-white" : "text-gray-700"
                )}
              >
                {1 === 1 ? formatDateTime(new Date(), "DD/MM/YYYY") : "Até"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {showStartDatePicker && (
          <DateTimePicker
            mode="date"
            locale="pt_BR"
            display="default"
            value={new Date()}
            onChange={handleSelectStartDate}
          />
        )}

        {showEndDatePicker && (
          <DateTimePicker
            mode="date"
            locale="pt_BR"
            display="default"
            value={new Date()}
            onChange={handleSelectEndDate}
          />
        )}
      </View>
    </View>
  );
}
