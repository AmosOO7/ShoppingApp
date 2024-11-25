import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { GestureResponderEvent } from "react-native";

export default function AddPostScreen() {
  const [text, setText] = useState("");

  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  //use to get category list
  const getCategoryList = async () => {
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("Data:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <View className="p-16 mt-6">
      <Formik
        initialValues={{
          title: "",
          desc: "",
          category: "",
          address: "",
          price: "",
          image: "",
        }}
        onSubmit={(value) => console.log(value)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
              <TouchableOpacity
                onPress={
                  handleSubmit as unknown as (e: GestureResponderEvent) => void
                }
                className="p-4 w-[50%] bg-black rounded-full mb-[1vh] self-end"
              >
                <Text className="text-center text-white">Submit</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="#242424"
                value={values?.title}
                onChangeText={handleChange("title")}
              />

              <TextInput
                style={[styles.input, styles.height]}
                placeholder="Description"
                placeholderTextColor="#242424"
                value={values?.desc}
                multiline={true}
                onChangeText={handleChange("desc")}
              />

              <TextInput
                style={styles.input}
                placeholder="address"
                placeholderTextColor="#242424"
                value={values?.address}
                onChangeText={handleChange("address")}
              />

              <TextInput
                style={styles.input}
                placeholder="price"
                placeholderTextColor="#242424"
                value={values?.price}
                keyboardType="number-pad"
                onChangeText={handleChange("price")}
              />
              <Text className="text-[4vw] text-center mt-5">
                Select Category
              </Text>
              <Picker
                selectedValue={values?.category}
                onValueChange={handleChange("category")}
                className="mb-10"
              >
                {categoryList &&
                  categoryList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.name}
                      color="#000"
                    />
                  ))}
              </Picker>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  height: {
    height: 100,
  },
});
