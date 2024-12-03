import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { SignedOut, useAuth, useUser } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();
  const { isLoaded, signOut } = useAuth();

  const sendMessage = () => {
    Linking.openURL("mailto:ayokunene@gmail.com");
  };

  return (
    <View className="justify-center self-center p-2">
      <View className="justify-center self-center">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[100px] h-[100px] rounded-full"
        />
      </View>
      <Text className="font-bold text-center pt-2 text-[30px]">
        {user?.fullName}
      </Text>
      <Text className="font-bold text-center pt-2 text-[20px] text-gray-400">
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
      <TouchableOpacity
        onPress={() => {
          sendMessage();
        }}
        className="bg-orange-400 rounded-3xl mt-48  p-4 justify-center self-center"
      >
        <Text className="font-bold text-center text-[20px] text-white">
          Message Admins
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
        className="bg-orange-400 rounded-3xl mt-48  p-4 justify-center self-center"
      >
        <Text className="font-bold text-center text-[20px] text-white">
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
