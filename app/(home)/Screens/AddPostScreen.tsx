import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../firebaseConfig";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useUser } from "@clerk/clerk-expo";

export default function AddPostScreen() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const { user } = useUser();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState<any[]>([]);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const onSubmitMethod = async (value: any) => {
    setLoading(true);
    if (!image) {
      console.log("No image selected!");
      // Handle case where image is not selected
      return;
    }

    try {
      // Convert URI to blob file
      const resp = await fetch(image);
      if (!resp.ok) {
        throw new Error("Image fetch failed.");
      }
      const blob = await resp.blob();

      // Set the storage path (could be dynamic)
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `uploads/${new Date().toISOString()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`
      );

      // Upload the image
      const uploadResult = await uploadBytes(storageRef, blob);
      console.log("Uploaded a blob or file!");

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(uploadResult.ref);
      console.log("File available at", downloadURL);
      value.image = downloadURL;
      value.userName = user?.fullName;
      value.userEmail = user?.primaryEmailAddress?.emailAddress;
      value.userImage = user?.imageUrl;
      // Now store the download URL in your Firestore or Realtime Database
      // For example, assuming you're using Firestore:
      const db = getFirestore();
      // Handle success (e.g., inform the user, update the UI)
      console.log("Post successfully created with image URL");
      //Storing the values on the DB
      const docRef = await addDoc(collection(db, "UserPost"), value);
      if (docRef.id) {
        setLoading(false);
        Alert.alert("Successful!!", "Post Added succesful");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error (e.g., show a toast or alert to the user)
      // You could show an error message to the user here
    }
  };

  return (
    <SafeAreaView className="pl-10 pr-10">
      <Text className="text-[7vw] text-center">Add new post</Text>
      <Text className="text-[4vw] text-center text-gray-500 mb-8">
        Create a post and start selling
      </Text>
      <Formik
        initialValues={{
          title: "",
          desc: "",
          category: "",
          address: "",
          price: "",
          userName: "",
          UserEmail: "",
          userImage: "",
        }}
        onSubmit={(value) => onSubmitMethod(value)}
        validate={(values) => {
          let errors = false;
          // if (!values.title) {
          //   errors = true;
          //   Toast.show({
          //     type: "error",
          //     text1: "Validation Error",
          //     text2: "Title is required!",
          //   });
          // }
          // if (!values.desc) {
          //   errors = true;
          //   Toast.show({
          //     type: "error",
          //     text1: "Validation Error",
          //     text2: "Description is required!",
          //   });
          // }
          // if (!values.address) {
          //   errors = true;
          //   Toast.show({
          //     type: "error",
          //     text1: "Validation Error",
          //     text2: "Address is required!",
          //   });
          // }
          // if (!values.price) {
          //   errors = true;
          //   Toast.show({
          //     type: "error",
          //     text1: "Validation Error",
          //     text2: "Price is required!",
          //   });
          // }
          // if (!image) {
          //   errors = true;
          //   Toast.show({
          //     type: "error",
          //     text1: "Validation Error",
          //     text2: "Image is required!",
          //   });
          // }
          // if (errors) throw new Error("Validation errors!");
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
              <TouchableOpacity
                onPress={handleSubmit as unknown as (e: any) => void}
                style={{ backgroundColor: loading ? "#ccc" : "#000" }}
                disabled={loading}
                className="p-4 w-[50%] bg-black rounded-2xl mb-[1vh] self-end"
              >
                {loading ? (
                  <ActivityIndicator color={"#fff"} />
                ) : (
                  <Text className="text-center text-white">Submit</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 20,
                      marginBottom: 10,
                    }}
                  />
                ) : (
                  <Image
                    source={require("../../../assets/images/ProjectImages/placeholder.jpg")}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 20,
                      marginBottom: 10,
                    }}
                  />
                )}
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
                placeholder="Address"
                placeholderTextColor="#242424"
                value={values?.address}
                onChangeText={handleChange("address")}
              />

              <TextInput
                style={styles.input}
                placeholder="Price"
                placeholderTextColor="#242424"
                value={values?.price}
                keyboardType="number-pad"
                onChangeText={handleChange("price")}
              />
              <Text className="text-[4vw] text-center mt-5">
                Select Category
              </Text>
              <View style={styles.category}>
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
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
      <Toast />
    </SafeAreaView>
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
  category: {
    borderWidth: 1,
    borderRadius: 15,
  },
});
