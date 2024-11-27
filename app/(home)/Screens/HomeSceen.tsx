import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/HomeScreen/Header";
import Slider from "../Components/HomeScreen/Slider";
import Categories from "../Components/HomeScreen/Categories";
import { app } from "@/firebaseConfig";
import { collection, getDocs, getFirestore, orderBy } from "firebase/firestore";
import Product from "../Components/HomeScreen/Product";

export default function HomeSceen() {
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [sliderList, setSliderList] = useState<any[]>([]);
  const [userPostList, setUserPostList] = useState<any[]>([]);
  useEffect(() => {
    getSliders();
    getCategoryList();
    getUserPostList();
  }, []);

  const db = getFirestore(app);
  // Used to get slider imgaes from db for home screen
  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Slider"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  const getUserPostList = async () => {
    setUserPostList([]);
    const querySnapshot = await getDocs(collection(db, "UserPost"));
    querySnapshot.forEach((doc) => {
      setUserPostList((userPostList) => [...userPostList, doc.data()]);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-white">
        <ScrollView>
          <Header />
          {/* Slider */}
          <Slider sliderList={sliderList} />
          {/* Categories */}
          <Categories categoryList={categoryList} />
          {/* product */}
          <Product userPostList={userPostList} type={"Products"} discount={0} />
          <Product
            userPostList={userPostList}
            type={"Discounted Products"}
            discount={5}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
