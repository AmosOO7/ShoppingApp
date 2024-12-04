import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { useCart } from "../Components/CartContext";

const CartScreen = () => {
  const { addToCart, cart, removeFromCart, grandTotal } = useCart(); // Removed check, as it's not needed for the entire cart

  return (
    <View className="flex-1 h-full pt-16 pr-4 pl-4">
      {cart.length > 0 ? (
        <View>
          <View className="flex-row self-center gap-7">
            <Text className="font-bold text-[20px] text-center pb-4">
              Cart Items
            </Text>
            <Text className="font-bold text-[20px] text-center pb-4">
              Total Price: ${grandTotal.toFixed(0)}
            </Text>
          </View>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="flex-row pb-10 gap-4">
                {/* Product Image and Details */}
                <View>
                  <Image
                    source={{ uri: item.image }}
                    className="w-[200px] h-[200px] rounded-xl"
                  />
                  <View className="p-2">
                    <Text>{item.title}</Text>
                    <Text className="font-bold text-orange-400 text-[15px]">
                      $
                      {(
                        item.price -
                        (item.price * item.discount) / 100
                      ).toFixed(0)}
                    </Text>
                  </View>
                </View>

                {/* Quantity Controls */}
                <View className="self-center justify-center rounded-2xl p-4 bg-orange-400 w-[40%] flex-row gap-4">
                  {/* Remove from Cart */}
                  <TouchableOpacity
                    onPress={() => {
                      removeFromCart(item.title);
                    }}
                  >
                    <Text className="text-orange-400 text-center font-bold text-[30px] w-[50px] rounded-xl bg-white">
                      -
                    </Text>
                  </TouchableOpacity>

                  {/* Item Quantity */}
                  <Text className="text-white font-bold text-center text-[30px]">
                    {item.quantity}
                  </Text>

                  {/* Add to Cart */}
                  <TouchableOpacity
                    onPress={() => {
                      addToCart(item);
                    }}
                  >
                    <Text className="text-orange-400 text-center font-bold text-[30px] w-[50px] rounded-xl bg-white">
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View className="justify-center self-center h-full">
          <Text className="text-gray-400 font-bold text-[40px] text-center">
            Cart is empty
          </Text>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
