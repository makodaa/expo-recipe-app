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
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PLACEHOLDER } from "../assets/images";
import CarouselCard from "../assets/components/CarouselCard";

const Home = () => {

  const url = "https://www.themealdb.com/api/json/v1/1/random.php";

  const getRecipes = async () => {
    const urls = Array(10).fill(url);
    const promises = urls.map(
      (url) => fetch(url)
      .then((res) => res.json())
      .then(data => data['meals'])
      );
    const data = (await Promise.all(promises)).flat();

    console.log(data);
    setRecipe(data);
  }

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    getRecipes();
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
            source={PLACEHOLDER}
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

  const renderDiscoverTitle = () => {
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
          Discover
        </Text>
      </View>
    );
  };

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
    <SafeAreaView style={styles.container}>
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
            {/*Categories Section*/}

            {/*Discover Title*/}
            {renderDiscoverTitle()}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b",
  },
});
