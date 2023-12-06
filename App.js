import "react-native-gesture-handler";
import React, { useCallback } from "react";
import { Home, Browse, Build, Favorites, Setup, Recipe } from "./screens/index";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "./constants/index";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Thin": require("./assets/fonts/Montserrat-Thin.ttf"),
  });

  const Root = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: COLORS.background,
            borderTopColor: COLORS.transparent,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="home"
                size={26}
                color={focused ? COLORS.primary : "#748c94"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Browse"
          component={Browse}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="apple-safari"
                size={26}
                color={focused ? COLORS.primary : "#748c94"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Build"
          component={Build}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="silverware-clean"
                size={26}
                color={focused ? COLORS.primary : "#748c94"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="bookmark-box-multiple"
                size={26}
                color={focused ? COLORS.primary : "#748c94"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Setup"
          component={Setup}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={26}
                color={focused ? COLORS.primary : "#748c94"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Root "
      >
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="Recipe" component={Recipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
