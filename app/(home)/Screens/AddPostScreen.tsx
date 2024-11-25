import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { useFocusEffect } from "expo-router";

export default function AddPostScreen() {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  //use to get category list
  const getCategoryList = async () => {
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("Data:", doc.data());
      setCategoryList((categoryList) => [...categoryList]);
    });
  };
  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <View>
      <Text>AddPostScreen</Text>
    </View>
  );
}
