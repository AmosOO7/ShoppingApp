import { View, Image, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useCart } from "./CartContext"; // Import the custom hook to use the cart context

// Function to generate a unique ID for each item
function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export default function ItemDetail() {
  const { params } = useRoute<any>();
  const [product, setProduct] = useState<any>(null); // Set initial state to null

  const { cart, count, addToCart, removeFromCart, check, checkProduct } =
    useCart(); // Access cart functions

  useEffect(() => {
    if (params) {
      setProduct(params.product); // Set the product from route params
    }
  }, [params]);

  const handleAddToCart = () => {
    const uniqueId = generateUniqueId(); // Generate new unique ID
    const productWithId = { ...product, id: uniqueId };

    // Add product to cart
    addToCart(productWithId);

    // Check product after adding
    checkProduct(product);
  };

  const handleRemoveFromCart = () => {
    // Find the first matching item in the cart to remove by ID
    const itemToRemove = cart.find((item) => item.title === product.title);
    if (itemToRemove) {
      removeFromCart(itemToRemove.id);
    }
  };

  return (
    <View className="p-4 flex-1">
      <View className="mb-[-40px] self-end">
        {/* Display the check count */}
        {check >= 0 ? (
          <Text
            className="text-[40px] font-bold text-orange-400"
            style={{ zIndex: 10000 }}
          >
            {check + 1}
          </Text>
        ) : (
          <Text
            className="text-[40px] font-bold text-orange-400"
            style={{ zIndex: 10000 }}
          >
            0
          </Text>
        )}
      </View>

      {/* Display product details */}
      <Image
        source={{ uri: product?.image }}
        className="h-[350px] w-[80%] rounded-2xl self-center justify-center"
      />
      <Text className="font-bold text-[30px]">{product?.title}</Text>
      <Text className="text-[10px] pt-1">{product?.category}</Text>

      <View className="flex-row">
        <Text className="font-bold text-orange-400 text-[20px]">
          $
          {(
            product?.price -
            (product?.price * product?.discount) / 100
          ).toFixed(2)}
        </Text>
        {product?.discount !== 0 && (
          <Text className="font-bold text-orange-400 text-[12px]">
            {product?.discount}% off
          </Text>
        )}
      </View>

      {product?.discount !== 0 && (
        <Text
          className="text-gray-400 font-bold text-[20px]"
          style={{ textDecorationLine: "line-through" }}
        >
          ${product?.price}
        </Text>
      )}

      <Text className="font-bold pt-2 text-[20px]">Description</Text>
      <Text className="pt-4 h-[15%]">{product?.desc}</Text>
      <Text className="font-bold pt-4 pb-1">
        Posted by: {product?.userName}
      </Text>

      <View className="self-center justify-center rounded-2xl p-4 bg-orange-400 w-[80%] flex-row gap-10">
        {/* Remove from Cart */}
        <TouchableOpacity onPress={handleRemoveFromCart}>
          <Text className="text-orange-400 text-center font-bold text-[30px] w-[50px] rounded-xl bg-white">
            -
          </Text>
        </TouchableOpacity>

        {/* Item Count */}
        <Text className="text-white font-bold text-center text-[30px]">
          {count} item(s) in Cart
        </Text>

        {/* Add to Cart */}
        <TouchableOpacity onPress={handleAddToCart}>
          <Text className="text-orange-400 text-center font-bold text-[30px] w-[50px] rounded-xl bg-white">
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
