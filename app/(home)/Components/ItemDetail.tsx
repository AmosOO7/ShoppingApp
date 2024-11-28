import { View, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
export default function ItemDetail({ discount }: any) {
  const { params } = useRoute<any>();
  const [product, setProduct] = useState<any>([]);
  useEffect(() => {
    params && setProduct(params.product);
  });
  return (
    <ScrollView className="p-4 flex-1 ">
      <Image
        source={{ uri: product.image }}
        className="h-[350px] w-[80%] rounded-2xl self-center justify-center"
      />
      <Text className="font-bold text-[30px]">{product.title}</Text>
      <Text className="text-[10px] pt-1">{product.category}</Text>
      <Text className="font-bold text-orange-400 text-[20px]">
        ${(product.price - (product.price * product.discount) / 100).toFixed(0)}
      </Text>
      {product.discount != 0 ? (
        <Text
          className="text-gray-400 font-bold text-[20px]"
          style={{ textDecorationLine: "line-through" }}
        >
          ${product.price}
        </Text>
      ) : (
        <Text></Text>
      )}
      <Text className="font-bold pt-2 text-[20px]">Description</Text>
      <Text className="pt-4 h-[30%]">{product.desc}</Text>
      <Text className="font-bold pt-4">Posted by:{product.userName}</Text>
    </ScrollView>
  );
}
