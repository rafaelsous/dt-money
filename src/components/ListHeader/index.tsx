import { ScrollView, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";

export const ListHeader = () => {
  return (
    <>
      <AppHeader />
      <View className="w-full h-[150]">
        <View className="h-[50] bg-background-primary" />
        <ScrollView
          className="absolute pl-6 h-[141]"
          horizontal
          showsHorizontalScrollIndicator={false}
        ></ScrollView>
      </View>
    </>
  );
};
