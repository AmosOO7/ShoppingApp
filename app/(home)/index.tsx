import { View } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import TabNav from "./Navigations/TabNav";
import CartScreen from "./Screens/CartScreen";

const index = () => {
  const { user } = useUser();
  return (
    <View className="flex-1">
      <SignedIn>
        <TabNav />
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </View>
  );
};

export default index;
