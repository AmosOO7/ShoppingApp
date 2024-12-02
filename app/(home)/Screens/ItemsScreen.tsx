import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Items from "../Components/Items";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { app } from "@/firebaseConfig";

const ItemsScreen = () => {
  const [itemList, setItemList] = useState<any[]>([]);
  const { params } = useRoute<any>();
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);
  useEffect(() => {
    params && getItemListByCategory();
  }, [params]);

  const getItemListByCategory = async () => {
    setItemList([]);
    setLoading(true);
    const q = query(
      collection(db, "UserPost"), // First argument: Collection reference
      where("category", "==", params.category) // Second argument: Where clause
    );
    const snapshot = await getDocs(q);
    setLoading(false);
    snapshot.forEach((doc) => {
      setItemList((itemList) => [...itemList, doc.data()]);
    });
  };
  return (
    <View className="flex-1 flex-row flex-wrap justify-center">
      {loading ? (
        <ActivityIndicator size={"large"} color={"#fb923c"} />
      ) : itemList?.length > 0 ? (
        <Items userPostList={itemList} />
      ) : (
        <View className="justify-center self-center h-full">
          <Text className="text-gray-400 font-bold text-[40px] text-center">
            Category is Empty
          </Text>
        </View>
      )}
    </View>
  );
};

export default ItemsScreen;
