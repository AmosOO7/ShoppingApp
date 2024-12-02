import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import React from "react";
import HomeSceen from "../Screens/HomeSceen";
import ItemsScreen from "../Screens/ItemsScreen";
import ItemDetailScreen from "../Screens/ItemDetailScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

type RootStackParamList = {
  Home: undefined;
  "item-list": { category: string }; // Define route params type
  Details: { category: string };
  item: { category: string };
  Cart: { category: string };
};

const MyStack = createStackNavigator<RootStackParamList>();

export default function HomeScreenStackNav() {
  return (
    <MyStack.Navigator>
      <MyStack.Screen
        name="Home"
        component={HomeSceen}
        options={{
          headerLeft: () => null,
          headerShown: false,
        }}
      />
      <MyStack.Screen
        name="item-list"
        component={ItemsScreen}
        options={({ route, navigation }) => {
          const category = route.params?.category ?? "Item List"; // Provide a default title if category is undefined
          return {
            headerLeft: () => (
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={40}
                color="black"
              />
            ),
            title: category,
            headerStyle: {
              backgroundColor: "#fb923c",
            },
            headerTitleStyle: {
              color: "white", // Optional: Change header text color for better contrast
            },
          } as StackNavigationOptions; // Cast to proper type
        }}
      />
      <MyStack.Screen
        name="Details"
        component={ItemDetailScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={40}
              color="black"
            />
          ),
          headerStyle: {
            backgroundColor: "#fb923c",
          },
          headerTitleStyle: {
            color: "white", // Optional: Change header text color for better contrast
          },
        })}
      />
    </MyStack.Navigator>
  );
}
