import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function Categories({ categoryList }: any) {
  return (
    <View className="mt-3 bg-orange-400 h-[400px]">
      <Text className="font-bold text-[5vw] text-center text-white pt-10">
        Categories
      </Text>
      <View className="mt-4 p-1">
        <FlatList
          data={categoryList}
          numColumns={4}
          showsHorizontalScrollIndicator={true}
          renderItem={({ item, index }) => (
            <TouchableOpacity className="flex-1 items-center rounded-lg p-1 mb-14 h-[100px] w-[100px]">
              <Image
                source={{ uri: item.icon }}
                className="h-full w-full object-contain rounded-lg"
              />
              <Text className=" text-[12px] text-center font-bold text-white">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
