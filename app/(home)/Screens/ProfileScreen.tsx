import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();
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
    </View>
  );
}
