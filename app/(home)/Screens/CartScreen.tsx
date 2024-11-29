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
  const { cart } = useCart();
  return (
    <View className="flex-1 bg-white pt-11">
      <Text className="font-bold text-[20px]">Cart Items:</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CartScreen;
