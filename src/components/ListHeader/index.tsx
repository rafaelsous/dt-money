import { ScrollView, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";

export const ListHeader = () => {
  return (
    <View className="w-full h-[200] bg-background-primary">
      <AppHeader />

      <ScrollView
        className="absolute pl-6 h-[141]"
        horizontal
        showsHorizontalScrollIndicator={false}
      ></ScrollView>
    </View>
  );
};
