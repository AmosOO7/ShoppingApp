import { View, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import ItemDetail from "../Components/ItemDetail";
export default function ItemDetailScreen() {
  const { params } = useRoute<any>();
  const [product, setProduct] = useState<any>([]);
  useEffect(() => {
    params && setProduct(params.product);
  });
  return (
    <View className="p-4 flex-1 ">
      <ItemDetail discount={3} />
    </View>
  );
}
