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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CarouselCard, CustomButton } from "../assets/components/index";
import { StatusBar } from "expo-status-bar";

const Home = () => {
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
          marginHorizontal: 20,
          alignItems: "center",
          height: 80,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Hello, User</Text>
          <Text style={{ color: "#fff", marginTop: 3 }}>
            What do you want to cook today?
          </Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Profile")}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/en/9/93/Buddy_christ.jpg"
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
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
          backgroundColor: "#fff",
        }}
      >
        <MaterialCommunityIcons name="magnify" size={20} color="black" />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
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
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            marginHorizontal: 20,
          }}
        >
          {text}
        </Text>
        <Text>

        </Text>
      </View>
    );
  };

  const renderCategories = () => {
    return (
      <View
      style={{
        marginTop: 20,
        marginHorizontal: 10
      }}
    >
      <FlatList
        data = {categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View>
              <CustomButton
                category={item['strCategory']}
                onPress={() => console.log("Recipe")}
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
      <View
        style={{
          marginTop: 20,
        }}
      >
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
      backgroundColor: "#18181b",
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }}>
      <StatusBar
        animated={true}
        backgroundColor="#18181b"
        style="light"
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
            {renderCategories()}
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
