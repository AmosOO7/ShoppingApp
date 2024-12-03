import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/firebaseConfig";

export default function Header() {
  const db = getFirestore(app);
  const [userPostList, setUserPostList] = useState<any[]>([]);
  const [filteredPostList, setFilteredPostList] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const { user } = useUser();
  const navigation = useNavigation<any>();

  // Fetch user posts from Firestore
  const getUserPostList = async () => {
    const querySnapshot = await getDocs(collection(db, "UserPost"));
    const posts = querySnapshot.docs.map((doc) => doc.data());
    setUserPostList(posts);
  };

  useEffect(() => {
    getUserPostList();
  }, []);

  // Filter userPostList based on searchValue
  const handleSearch = (text: string) => {
    setSearchValue(text);
    if (text === "") {
      setFilteredPostList([]);
      return;
    }

    const filteredList = userPostList.filter((post) =>
      post.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPostList(filteredList);
  };

  return (
    <View>
      <View
        className="pl-10 pr-10 flex-row gap-4 
      justify-start self-center pt-16 pb-3 
      bg-orange-400 w-full"
      >
        {/* User info section */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
          className="flex-row items-center"
        >
          <Image
            source={{ uri: user?.imageUrl }}
            className="rounded-full w-10 h-10 border-[1px]"
          />
        </TouchableOpacity>

        {/* Search bar */}
        <View className="p-3 rounded-lg items-start flex-row bg-blue-50">
          <Ionicons name="search" size={24} color="#a9a9a9" />
          <TextInput
            placeholder="Search"
            clearButtonMode="always"
            placeholderTextColor={"#a9a9a9"}
            className="ml-3 text-[4vw] w-[80%] justify-center self-center"
            value={searchValue}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Autocomplete Dropdown */}
      {filteredPostList.length > 0 && searchValue !== "" && (
        <View
          className="w-full top-28 rounded-br-2xl rounded-bl-2xl absolute h-auto bg-white border border-gray-300"
          style={{ zIndex: 1000 }}
        >
          <FlatList
            data={filteredPostList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="w-full h-auto p-2 bg-gray-200"
                onPress={() => {
                  setSearchValue(item.title);
                  setFilteredPostList([]);
                  navigation.navigate("Details", { product: item });
                }}
              >
                <Text className="text-black p-5 font-bold text-[15px] bg-white rounded-lg">
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
