import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";

export default function Header() {
  const { user } = useUser();
  const navigation = useNavigation<any>();
  return (
    <View
      className="pl-10 pr-10 flex-row gap-4 
    justify-start self-center pt-16 pb-3 
    bg-orange-400 w-full"
    >
      {/* user info section */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile");
        }}
        className="flex-row items-center "
      >
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-10 h-10 border-[1px]"
        />
      </TouchableOpacity>
      {/* search bar */}
      <View className="p-3 rounded-lg items-start flex-row bg-blue-50">
        <Ionicons name="search" size={24} color="#a9a9a9" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={"#a9a9a9"}
          className="ml-3 text-[4vw] w-[80%] justify-center self-center"
        />
      </View>
    </View>
  );
}
