import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { COLORS, DARK, SIZES, FONTS } from "../constants/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CarouselCard, CustomButton } from "../assets/components/index";
import { StatusBar } from "expo-status-bar";


const Home = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const urlCategories = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await fetch(urlCategories);
    const data = await response.json();

    console.log(data);
    setCategories(data['meals']);
  }

  const urlRandom = "https://www.themealdb.com/api/json/v1/1/random.php";
  const [recipe, setRecipe] = useState([]);

  const getRecipes = async () => {
    const urls = Array(10).fill(urlRandom);
    const promises = urls.map(
      (url) => fetch(url)
      .then((res) => res.json())
      .then(data => data['meals'])
      );
    const data = (await Promise.all(promises)).flat();

    console.log(data);
    setRecipe(data);
  }

  useEffect(() => {
    getRecipes();
    getCategories();
  }, []);
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.margin,
          marginHorizontal: SIZES.margin,
          alignItems: "center",
          height: 80,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ color: COLORS.onsurface, ...FONTS.h1 }}>Hello, User</Text>
          <Text style={{ color: COLORS.onsurface, ...FONTS.body}}>
            What do you want to cook today?
          </Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Profile")}>
          <Image
            source={require("../assets/images/placeholder/profile.png")}
            style={{
              width: 52,
              height: 52,
              borderRadius: 40,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: 20,
          paddingHorizontal: 20,
          borderRadius: 10,
          backgroundColor: COLORS.surfacevariant,
        }}
      >
        <MaterialCommunityIcons name="magnify" size={18} color={COLORS.onsurfacevariant} />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
            color: COLORS.onsurfacevariant,
          }}
          placeholder="Search Recipes"
        />
      </View>
    );
  };

  const renderTitle = (text) => {
    return (
      <View
        style={{
          marginVertical: 15,
        }}
      >
        <Text
          style={{
            color: COLORS.onsurface,
            marginHorizontal: 20,
            ...FONTS.h2,
          }}
        >
          {text}
        </Text>
        <Text>

        </Text>
      </View>
    );
  };

  const renderCategories = (data) => {
    return (
      <View
      style={{
        marginHorizontal: 20
      }}
    >
      <FlatList
        data = {data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View>
              <CustomButton
                category = {item['strCategory']}
              ></CustomButton>
            </View>
          );
        }
      }
      />
      </View>
      )
    }

  const renderCarousel = () => {
    return (
      <View>
        <FlatList
          data={recipe}
          horizontal
          decelerationRate={"fast"}
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View>
                <CarouselCard
                  recipeItem={item}
                  onPress={() => console.log("Recipe")}
                  containerStyle={{
                    marginLeft: index === 0 ? 20 : 0,
                  }}
                ></CarouselCard>
              </View>
            );
          }}
        ></FlatList>
      </View>
    );
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.surface,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }}>
      <StatusBar
        animated={true}
        backgroundColor = {COLORS.transparent}
        style="dark"
        barStyle='light-content'
        hidden={false}
      />
      <FlatList
        data={null}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/*Header Section*/}
            {renderHeader()}
            {/*Header Searchbar*/}
            {renderSearchBar()}
            {/*Categories Title*/}
            {renderTitle("Categories")}
            {/*Categories Section*/}
            {renderCategories(categories)}
            {/*Discover Title*/}
            {renderTitle("Discover")}
            {/*Discover Carousel*/}
            {renderCarousel(recipe)}
          </View>
        }
        renderItem={({ item }) => {
          return null;
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 100,
            }}
          ></View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
