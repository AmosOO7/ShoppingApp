import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";

export default function Product({ userPostList, type }: any) {
  const navigation = useNavigation<any>();
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
    <TouchableOpacity activeOpacity={1} className="flex-1">
      <Text className="font-bold text-[5vw] self-center justify-center text-center pt-5">
        {type}
      </Text>
      <View className="mt-4 justify-center self-center">
        <FlatList
          data={userPostList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-2"
              onPress={() => navigation.navigate("Details", { product: item })}
            >
              <Image
                source={{ uri: item.image }}
                className="h-[100px] w-[100px] mr-2 ml-2 object-contain rounded-lg"
              />
              <Text className="text-[10px]">{item.category}</Text>
              <Text className="mt-1 font-bold">
                {limitWords(item.title, 2)}
              </Text>
              <View className="flex-row">
                <Text className="font-bold text-orange-400 text-[20px]">
                  $
                  {(item.price - (item.price * item.discount) / 100).toFixed(0)}
                </Text>
                {item.discount != 0 ? (
                  <Text className="font-bold text-orange-400 text-[12px]">
                    {" "}
                    {item.discount}% off
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </View>
              {item.discount != 0 ? (
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
    </TouchableOpacity>
  );
}
