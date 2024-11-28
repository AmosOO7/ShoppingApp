import { View, Text } from "react-native";
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
  const db = getFirestore(app);
  useEffect(() => {
    params && getItemListByCategory();
  }, [params]);

  const getItemListByCategory = async () => {
    setItemList([]);
    const q = query(
      collection(db, "UserPost"), // First argument: Collection reference
      where("category", "==", params.category) // Second argument: Where clause
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setItemList((itemList) => [...itemList, doc.data()]);
    });
  };
  return (
    <View className="flex-1 flex-row flex-wrap justify-center">
      <Items userPostList={itemList} discount={0} />
    </View>
  );
};

export default ItemsScreen;
