import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import React from "react";
import HomeSceen from "../Screens/HomeSceen";
import ItemsScreen from "../Screens/ItemsScreen";
import ExploreScreen from "../Screens/ExploreScreen";
import ItemDetailScreen from "../Screens/ItemDetailScreen";

type RootStackParamList = {
  Home: undefined;
  "item-list": { category: string }; // Define route params type
  Details: { category: string };
};

const MyStack = createStackNavigator<RootStackParamList>();

export default function HomeScreenStackNav() {
  return (
    <MyStack.Navigator>
      <MyStack.Screen
        options={{ headerLeft: () => null, headerShown: false }}
        name="Home"
        component={HomeSceen}
      />
      <MyStack.Screen
        name="item-list"
        component={ItemsScreen}
        options={({ route }) => {
          const category = route.params?.category ?? "Item List"; // Provide a default title if category is undefined
          return {
            headerLeft: () => null,
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
        options={{
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: "#fb923c",
          },
          headerTitleStyle: {
            color: "white", // Optional: Change header text color for better contrast
          },
        }}
        component={ItemDetailScreen}
      />
    </MyStack.Navigator>
  );
}
