import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useCart } from "../Components/CartContext";

const CartScreen = () => {
  const { cart, removeFromCart } = useCart();
  return (
    <View className="flex-1 h-full pt-16 pr-4 pl-4">
      {cart.length > 0 ? (
        <View className="">
          <Text className="font-bold text-[20px] text-center pb-4">
            Cart Items
          </Text>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="flex-row pb-10 gap-4">
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

                <View className="self-center justify-center rounded-2xl p-4 bg-orange-400 w-[40%] gap-40">
                  {/* Remove Button */}
                  <TouchableOpacity
                    onPress={() => {
                      removeFromCart(item.id);
                    }}
                  >
                    <Text className="text-orange-400 text-center font-bold text-[10px] w-[100%] p-2 rounded-xl bg-white">
                      Revove From Cart
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
