import {
  ScrollView,
  Text,
  Image,
  View,
  Button,
  Modal,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import ItemsScreen from "./Screens/ItemsScreen";
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { Link } from "expo-router";
import SignInWithOAuth from "./Components/SignInWithOAuth";
import TabNav from "./Navigations/TabNav";
import { NavigationContainer } from "@react-navigation/native";

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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {},
  box: {
    width: windowWidth > 500 ? "70%" : "90%",
    height: windowHeight > 600 ? "60%" : "90%",
    backgroundColor: "lightblue",
    justifyContent: "center",
  },
  text: {
    fontSize: windowHeight > 500 ? 50 : 24,
  },
});
