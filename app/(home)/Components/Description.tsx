import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export default function Description() {
  const { params } = useRoute<any>();
  const [product, setProduct] = useState<any>(null); // Set initial state to null

  useEffect(() => {
    if (params) {
      setProduct(params.product); // Set the product from route params
    }
  }, [params]);
  return (
    <ScrollView className="p-8">
      <Text className="text-[16px] text-black">{product?.desc}</Text>
    </ScrollView>
  );
}
