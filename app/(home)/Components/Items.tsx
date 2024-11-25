import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const Items = () => {
  return (
    <View>
      <TouchableOpacity className="w-[45vw] bg-blue-100 h-[40vh] ml-[1vw] border-2 mb-[1vh] rounded-3xl">
        <Image
          source={require("../../../assets/images/ProjectImages/loginPic.webp")}
          className="w-full h-[80%] rounded-t-3xl"
        />
        <Text className="text-center text-[4vw]">Item Name</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Items;
