import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  Browse,
  Build,
  Favorites,
  Setup
} from "./screens";


import BottomTabNavigator from "./navigation/BottomTabNavigator";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Home">
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="Browse" component={Browse} />
        <Stack.Screen name="Build" component={Build} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Setup" component={Setup} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
