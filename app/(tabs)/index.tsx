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

const index = () => {
  return (
    <View className="flex-1">
      <ScrollView>
        <ItemsScreen />
      </ScrollView>
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
