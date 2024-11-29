import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeSceen from "../Screens/HomeSceen";
import ExploreScreen from "../Screens/ExploreScreen";
import AddPostScreen from "../Screens/AddPostScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreenStackNav from "./HomeScreenStackNav";
import ItemDetail from "../Components/ItemDetail";
import ItemDetailScreen from "../Screens/ItemDetailScreen";
import ExplorerScreenStackNav from "./ExplorerScreenStackNav";
import { CartProvider } from "../Components/CartContext";

import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../Screens/CartScreen";

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <View className="flex-1">
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarActiveTintColor: "#000" }}
      >
        <Tab.Screen
          name="home-nav"
          component={HomeScreenStackNav}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginBottom: 10 }}>
                Home
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="explore-nav"
          component={ExplorerScreenStackNav}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginBottom: 10 }}>
                Explore
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="add"
          component={AddPostScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginBottom: 10 }}>
                Add Items
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="cart"
          component={CartScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginBottom: 10 }}>
                Cart
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
