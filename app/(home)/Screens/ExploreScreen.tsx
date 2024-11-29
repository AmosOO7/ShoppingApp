import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Items from "../Components/Items";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import Header from "../Components/HomeScreen/Header";

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [userPostList, setUserPostList] = useState<any[]>([]);
  const getUserPostList = async () => {
    setUserPostList([]);
    const querySnapshot = await getDocs(collection(db, "UserPost"));
    querySnapshot.forEach((doc) => {
      setUserPostList((userPostList) => [...userPostList, doc.data()]);
    });
  };
  useEffect(() => {
    getUserPostList();
  }, []);
  return (
    <ScrollView className="flex-1 pb-12 bg-gray-200">
      <Header />
      <Items userPostList={userPostList} />
      <Items userPostList={userPostList} />
    </ScrollView>
  );
}
