import { View, Text } from "react-native";
import React from "react";
import Items from "../Components/Items";

const ItemsScreen = () => {
  return (
    <View className="mt-10 p-[2vw] flex-1 flex-row flex-wrap justify-center">
      <Items />
      <Items />
      <Items />
      <Items />
      <Items />
      <Items />
    </View>
  );
};

export default ItemsScreen;
