import { View, Image, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCart } from "./CartContext"; // Import the custom hook to use the cart context

export default function ItemDetail() {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();
  const [product, setProduct] = useState<any>(null); // Set initial state to null
  const { count, addToCart, removeFromCart, checkProduct } = useCart(); // Access cart functions

  // Limit words function to handle non-string and string input
  const limitWords = (str: any, limit: number) => {
    // Convert to string if it's a number or another type
    const stringified = typeof str === "string" ? str : String(str);
    const words = stringified.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + " ...."
      : stringified;
  };

  useEffect(() => {
    if (params) {
      setProduct(params.product); // Set the product from route params
      checkProduct(params.product); // Check product when page loads
    }
  }, [params]);

  const handleAddToCart = () => {
    addToCart(product); // Add product to cart
    checkProduct(product); // Update check count
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.title); // Remove product by title
  };

  return (
    <View className="p-4 flex-1">
      {/* Display product details */}
      <Image
        source={{ uri: product?.image }}
        className="h-[350px] w-[80%] rounded-2xl self-center justify-center"
      />
      <Text className="font-bold text-[30px]">{product?.title}</Text>
      <Text className="text-[10px] pt-1">{product?.category}</Text>

      {/* Price Section */}
      <View className="flex-row">
        <Text className="font-bold text-orange-400 text-[20px]">
          $
          {(
            product?.price -
            (product?.price * product?.discount) / 100
          ).toFixed(0)}
        </Text>
        {product?.discount !== 0 && (
          <Text className="font-bold text-orange-400 text-[12px]">
            {product?.discount}% off
          </Text>
        )}
      </View>
      <View>
        {product?.discount !== 0 && (
          <Text
            className="text-gray-400 font-bold text-[20px]"
            style={{ textDecorationLine: "line-through" }}
          >
            ${product?.price}
          </Text>
        )}
      </View>

      <Text className="font-bold pt-2 text-[20px]">Description</Text>
      <TouchableOpacity
        className="w-[100%] h-[20%] p-2"
        onPress={() => {
          navigation.navigate("Description", { product: product });
        }}
      >
        <Text className="pt-4 text-black">{limitWords(product?.desc, 30)}</Text>
      </TouchableOpacity>

      <View className="self-center justify-center rounded-2xl p-4 bg-orange-400 w-[80%] flex-row gap-10">
        <TouchableOpacity onPress={handleRemoveFromCart}>
          <Text className="text-orange-400 text-center font-bold text-[30px] w-[50px] rounded-xl bg-white">
            -
          </Text>
        </TouchableOpacity>

        <Text className="text-white font-bold text-center text-[30px]">
          {count} item(s) in Cart
        </Text>

        <TouchableOpacity onPress={handleAddToCart}>
          <Text className="text-orange-400 text-center font-bold text-[30px] w-[50px] rounded-xl bg-white">
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
