import { View, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import ItemDetail from "../Components/ItemDetail";
export default function ItemDetailScreen() {
  const { params } = useRoute<any>();
  const [product, setProduct] = useState<any>([]);
  useEffect(() => {
    params && setProduct(params.product);
  });
  return (
    <View className="p-4 flex-1 ">
      <ItemDetail />
    </View>
  );
}
