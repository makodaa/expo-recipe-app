import "react-native-gesture-handler";
import React, {useCallback} from "react";
import { Browse, Build, Favorites, Setup } from "./screens/index";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Thin": require("./assets/fonts/Montserrat-Thin.ttf"),
  });

  const onLayoutRootView = useCallback(async() => {
    if (fontsLoaded){
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
        initialRouteName="HomeStack "
      >
        <Stack.Screen name="HomeStack" component={ BottomTabNavigator } />
        <Stack.Screen name="Browse" component={ Browse } />
        <Stack.Screen name="Build" component={ Build } />
        <Stack.Screen name="Favorites" component={ Favorites } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
