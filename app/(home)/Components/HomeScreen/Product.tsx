import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function Product({ userPostList, type, discount }: any) {
  // Limit words function to handle non-string and string input
  const limitWords = (str: any, limit: number) => {
    // Convert to string if it's a number or another type
    const stringified = typeof str === "string" ? str : String(str);
    const words = stringified.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : stringified;
  };

  return (
    <View className=" flex-1">
      <Text className="font-bold text-[5vw] self-center justify-center text-center pt-5">
        {type}
      </Text>
      <View className="mt-4 justify-center self-center">
        <FlatList
          data={userPostList}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          pagingEnabled={true}
          renderItem={({ item }) => (
            <TouchableOpacity className="p-2">
              <Image
                source={{ uri: item.image }}
                className="h-[100px] w-[100px] mr-2 ml-2 object-contain rounded-lg"
              />
              <Text className="text-[10px]">{item.category}</Text>
              <Text className="mt-1 font-bold">
                {limitWords(item.title, 2)}
              </Text>
              <Text className="font-bold text-orange-400">
                ${(item.price - (item.price * discount) / 100).toFixed(0)}
              </Text>
              {discount ? (
                <Text
                  className="text-gray-400 font-bold"
                  style={{ textDecorationLine: "line-through" }}
                >
                  ${item.price}
                </Text>
              ) : (
                <Text></Text>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
