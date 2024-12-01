import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

const LoginScreen = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View className="flex-1">
      <Image
        source={require("../../../assets/images/ProjectImages/ecommerce.png")}
        className="w-full h-[60%] object-cover"
      />
      <View className="p-[8vw] bg-white mt-[-7vh] rounded-t-3xl h-[50vh]">
        <Text className="text-[7vw] text-center">E-Commerca</Text>
        <Text className="text-[3vw] text-slate-500 mt-6 text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
          corrupti tempora, eum dolor earum optio nobis id cum ipsa, molestiae
          ut placeat ex amet consequatur. Tenetur dolorum similique consequatur
          maxime!
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="p-4 w-full bg-blue-500 mt-[4vh] rounded-full"
        >
          <Text className="text-white text-center text-[3vw]">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
