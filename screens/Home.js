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
  Pressable,
  Modal,
} from "react-native";
import { COLORS, DARK, SIZES, FONTS } from "../constants/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CarouselCard, CustomButton } from "../assets/components/index";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pre } from "@expo/html-elements";

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const urlCategories =
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
  const urlRandom = "https://www.themealdb.com/api/json/v1/1/random.php";
  const profilePictures = [
    require("../assets/images/profiles/1.png"),
    require("../assets/images/profiles/2.png"),
    require("../assets/images/profiles/3.png"),
    require("../assets/images/profiles/4.png"),
  ];
  
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [profile, setProfile] = useState("0");
  const [user, setUser] = useState("User");
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [pictureModalVisible, setPictureModalVisible] = useState(false);

  const getCategories = async () => {
    const response = await fetch(urlCategories);
    const data = await response.json();
    setCategories(data["meals"]);
  };

  const getRecipes = async () => {
    const urls = Array(10).fill(urlRandom);
    const promises = urls.map((url) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data["meals"])
    );
    const data = (await Promise.all(promises)).flat();
    setRecipe(data);
  };

  async function getFavorites() {
    try {
      // only get keys that are numbers (favorites)
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter((key) => !isNaN(key));
      // get all values from keys
      const values = await AsyncStorage.multiGet(filteredKeys);
      // filter out null values
      const filteredValues = values.filter((value) => value[1] !== null);
      // map values to objects
      const favorites = filteredValues.map((value) => JSON.parse(value[1]));
      setFavorites(favorites);
    } catch (error) {
      console.error(error);
    }
  }

  const getUserProfile = async() => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        setUser(value);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getUserPicture = async() => {
    try {
      const value = await AsyncStorage.getItem("profile");
      if (value !== null) {
        setProfile(value);
      }
    } catch (error) {
      setProfile("0");
      console.error(error);
    }
  }


  useEffect(() => {
    getRecipes();
    getCategories();
    getFavorites();
    getUserProfile();
    getUserPicture();
  }, []);


  const renderAppTitleHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: 'center',
          height: 80,
          backgroundColor: COLORS.primary,
          paddingHorizontal: 20,
        }}
      >
        <MaterialCommunityIcons name="web" size={36} color={COLORS.white} />
        <Text
        style= {{
          ...FONTS.h1,
          color: COLORS.white,
        }}
        >
          RECIPE ATLAS
        </Text>
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.margin,
          marginBottom: 10,
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
          {/* pressable which brings up a modal to allow the user to change user name */}
          <Pressable onPress={() => setNameModalVisible(true)}>
            <Text
              style={{
                color: COLORS.onsurface,
                ...FONTS.h1,
                fontSize: 24,
              }}
            >
              Hello {user},
            </Text>
          </Pressable>
          <Text style={{ color: COLORS.onsurface, ...FONTS.body }}>
            What do you want to cook today?
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setPictureModalVisible(true)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 62,
            height: 62,
            borderRadius: 40,
            borderWidth: 2,
            borderColor: COLORS.primary,
            borderStyle: "dashed",
          }}
        >
          <Image
            source={profilePictures[profile]}
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
        <MaterialCommunityIcons
          name="magnify"
          size={18}
          color={COLORS.onsurfacevariant}
        />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
            color: COLORS.onsurfacevariant,
          }}
          placeholder="Search Recipes"
          onChangeText={(e) => setQuery(e.target.value)}
        />
        <Pressable
          onPress={() =>
            navigation.navigate("Browse", { external_query: query })
          }
        >
          <MaterialCommunityIcons
            name="arrow-right"
            size={18}
            color={COLORS.onsurfacevariant}
          />
        </Pressable>
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
        <Text></Text>
      </View>
    );
  };

  const renderCategories = (data) => {
    return (
      <View
        style={{
          marginHorizontal: 20,
        }}
      >
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                style={{
                  alignItems: "center",
                  elevation: 8,
                  backgroundColor: COLORS.primary,
                  marginRight: 10,
                  marginVertical: 2,
                  borderRadius: 4,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
                onPress={() => {
                  navigation.navigate("Browse", {
                    strCategory: item.strCategory,
                  });
                }}
              >
                <Text
                  style={{
                    color: COLORS.onbackground,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {item.strCategory}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
    );
  };

  const renderCarousel = (items) => {
    return (
      <View>
        <FlatList
          data={items}
          horizontal
          decelerationRate={"fast"}
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View>
                <CarouselCard
                  recipeItem={item}
                  containerStyle={{
                    marginLeft: index === 0 ? 20 : 0,
                  }}
                  onPress={() => {
                    navigation.navigate("Recipe", { idMeal: item.idMeal });
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.surface,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar
        animated={true}
        backgroundColor={COLORS.transparent}
        style="dark"
        barStyle="light-content"
        hidden={false}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={nameModalVisible}
        onRequestClose={() => {
          setNameModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.transparent,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.surfacevariant,
              borderRadius: 20,
              padding: 35,
              marginHorizontal: 10,
              alignItems: "center",
              shadowColor: COLORS.onbackground,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: COLORS.onbackground,
                ...FONTS.h2,
              }}
            >
              Change Username
            </Text>
            <TextInput
              style={{
                height: 40,
                width: 200,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                color: COLORS.surface,
                ...FONTS.body,
              }}
              onChangeText={(text) => setUser(text)}
              value={user}
              placeholder={user}
            />
            <Pressable
              style={{
                elevation: 8,
                backgroundColor: COLORS.primary,
                borderRadius: 4,
                paddingVertical: 10,
                paddingHorizontal: 12,
                marginVertical: 10,
              }}
              onPress={() => {
                setNameModalVisible(!nameModalVisible);
                setUser(user);
                AsyncStorage.setItem("user", user);
              }}
            >
              <Text
                style={{
                  color: COLORS.surface,
                  ...FONTS.body,
                }}
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={pictureModalVisible}
        onRequestClose={() => {
          setPictureModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.transparent,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.surfacevariant,
              borderRadius: 20,
              padding: 35,
              marginHorizontal: 10,
              alignItems: "center",
              shadowColor: COLORS.onbackground,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: COLORS.onbackground,
                ...FONTS.h2,
              }}
            >
              Change Profile Picture
            </Text>
            <FlatList
              data={profilePictures}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={{
                      alignItems: "center",
                      elevation: 8,
                      backgroundColor: COLORS.primary,
                      marginRight: 10,
                      marginVertical: 2,
                      borderRadius: 40,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                    }}
                    onPress={() => {
                      setPictureModalVisible(!pictureModalVisible);
                      setProfile(index.toString());
                      AsyncStorage.setItem("profile", index.toString());
                    }}
                  >
                    <Image
                      source={item}
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 40,
                      }}
                    />
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>   
      <FlatList
        data={null}
        extraData={favorites}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/*Header Section*/}
            {renderAppTitleHeader()}
            {renderHeader()}
            {/*Header Searchbar*/}
            {/* {renderSearchBar()} */}
            {/*Categories Title*/}
            {/* {renderTitle("Categories")} */}
            {/*Categories Section*/}
            {/* {renderCategories(categories)} */}
            {/*Discover Title*/}
            {renderTitle("Discover")}
            {/*Discover Carousel*/}
            {renderCarousel(recipe)}
            {/*Favorites Title*/}
            {renderTitle("Favorites")}
            {/*Favorites Carousel*/}
            {renderCarousel(favorites)}
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
      <TouchableOpacity
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          right: 30,
          bottom: 80,
          backgroundColor: COLORS.primary,
          borderRadius: 30,
          elevation: 10,
        }}
        onPress={() => getFavorites()}
      >
        <MaterialCommunityIcons name="reload" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
