import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import React from "react";
import HomeSceen from "../Screens/HomeSceen";
import ItemsScreen from "../Screens/ItemsScreen";
import ItemDetailScreen from "../Screens/ItemDetailScreen";
import ExploreScreen from "../Screens/ExploreScreen";

type RootStackParamList = {
  explorer: undefined;
  "item-list": { category: string }; // Define route params type
  Details: { category: string };
  item: { category: string };
};

const MyStack = createStackNavigator<RootStackParamList>();

export default function ExplorerScreenStackNav() {
  return (
    <MyStack.Navigator>
      <MyStack.Screen
        options={{ headerLeft: () => null, headerShown: false }}
        name="explorer"
        component={ExploreScreen}
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
