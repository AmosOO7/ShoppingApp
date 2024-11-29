import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import Product from "./HomeScreen/Product";

const Items = ({ userPostList, type }: any) => {
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
    <View className=" flex-1 self-center justify-center">
      {type ? (
        <Text
          className="font-bold text-[5vw] self-center 
        justify-center text-center
        bg-orange-400 w-full pt-6 pb-10
         text-white"
        >
          {type}
        </Text>
      ) : (
        <Text></Text>
      )}
      <View className="mt-1 justify-center p-2 self-center">
        <FlatList
          data={userPostList}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-1 justify-center self-center
            border-[3px] border-gray-200 bg-white rounded-3xl"
              onPress={() => navigation.navigate("Details", { product: item })}
            >
              <Image
                source={{ uri: item.image }}
                className="h-[300px] w-[180px] mr-1 ml-1 mb-3 self-center 
                justify-center object-contain rounded-lg"
              />
              <Text className="text-[10px]">{item.category}</Text>
              <Text className="mt-1 font-bold">
                {limitWords(item.title, 4)}
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
    </View>
  );
};

export default Items;
