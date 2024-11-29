import { View, Image, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useCart } from "./CartContext"; // Import the custom hook to use the cart context

// Function to generate a unique ID for each item
function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export default function ItemDetail() {
  const [count, setCount] = useState(0);
  const { params } = useRoute<any>();
  const [product, setProduct] = useState<any>([]);

  const { addToCart, removeFromCart } = useCart(); // Access cart functions

  useEffect(() => {
    params && setProduct(params.product);
  }, [params]);

  return (
    <View className="p-4 flex-1">
      <Image
        source={{ uri: product.image }}
        className="h-[350px] w-[80%] rounded-2xl self-center justify-center"
      />
      <Text className="font-bold text-[30px]">{product.title}</Text>
      <Text className="text-[10px] pt-1">{product.category}</Text>
      <View className="flex-row">
        <Text className="font-bold text-orange-400 text-[20px]">
          $
          {(product.price - (product.price * product.discount) / 100).toFixed(
            0
          )}
        </Text>
        {product.discount !== 0 && (
          <Text className="font-bold text-orange-400 text-[12px]">
            {" "}
            {product.discount}% off
          </Text>
        )}
      </View>
      {product.discount !== 0 && (
        <Text
          className="text-gray-400 font-bold text-[20px]"
          style={{ textDecorationLine: "line-through" }}
        >
          ${product.price}
        </Text>
      )}
      <Text className="font-bold pt-2 text-[20px]">Description</Text>
      <Text className="pt-4 h-[15%]">{product.desc}</Text>
      <Text className="font-bold pt-4 pb-1">Posted by: {product.userName}</Text>
      <View className="self-center justify-center rounded-2xl p-4 bg-orange-400 w-[80%] flex-row gap-40">
        {/* Add Button */}
        <TouchableOpacity
          onPress={() => {
            const uniqueId = generateUniqueId();
            addToCart({ ...product, id: uniqueId });
            setCount(count + 1);
          }}
        >
          <Text className="text-orange-400 text-center font-bold text-[30px] w-[50px] rounded-xl bg-white">
            +
          </Text>
        </TouchableOpacity>

        {/* Count Display */}
        <Text className="text-white font-bold text-center text-[30px]">
          {count}
        </Text>

        {/* Remove Button */}
        <TouchableOpacity
          onPress={() => {
            if (count > 0) {
              removeFromCart(product.id);
              setCount(count - 1);
            }
          }}
        >
          <Text className="text-orange-400 text-center font-bold text-[30px] w-[50px] rounded-xl bg-white">
            -
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
