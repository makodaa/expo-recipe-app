import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTS } from "../constants/index";

const Browse = ({ navigation, externalQuery}) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const txtField = React.createRef();
  const insets = useSafeAreaInsets();

  const getResults = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
    );
    const data = await response.json();
    if (data["meals"] == null) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`
      );
      const data = await response.json();
      setResults(data["meals"]);
      return;
    }
    setResults(data["meals"]);
  };

  const urlCategories =
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await fetch(urlCategories);
    const data = await response.json();

    console.log(data);
    setCategories(data["meals"]);
  };

  const urlCountries =
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    const response = await fetch(urlCountries);
    const data = await response.json();

    console.log(data);
    setCountries(data["meals"]);
  };
  useEffect(() => {
    getCategories();
    getCountries();
  }, []);

  useEffect(() => {
    if (externalQuery && externalQuery != "") {
      setQuery(externalQuery);
      txtField.current.value = externalQuery;
    }
    getResults();
  }, [query]);

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
  const renderPageHeader = () => (
    <View>
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        height: 40,
        columnGap: 10,
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 40,
        paddingHorizontal:20,
        backgroundColor: COLORS.transparent,
      }}
    >
      <MaterialCommunityIcons
        name="arrow-left"
        color={COLORS.onsurface}
        size={18}
      />
      <Text
        style={{ color: COLORS.onsurface, ...FONTS.body, fontSize: 18 }}
      >
        Browse
      </Text>
    </Pressable>
  </View>
  );
  const renderSearchBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.margin,
          marginHorizontal: SIZES.margin,
          alignItems: "center",
          height: 80,
          columnGap: SIZES.base,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexGrow: 1,
            height: 40,
            alignItems: "center",
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
            onChange={(e) => setQuery(e.target.value)}
            ref={txtField}
          />
          <Pressable
            style={{
              height: 20,
              width: 20,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.transparent,
            }}
            onPress={() => {
              setQuery("");
              txtField.current.value = "";
            }}
          >
            <MaterialCommunityIcons
              name="close"
              size={18}
              color={COLORS.onsurfacevariant}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  const renderCategories = (data) => {
    return (
      <View
        style={{
          marginHorizontal: 20,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <FlatList
          contentContainerStyle={{
            justifyContent: "space-between",
          }}
          data={data}
          numColumns={4}
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
                  setQuery(
                    item.strCategory == null ? item.strArea : item.strCategory
                  );
                  txtField.current.value =
                    item.strCategory == null ? item.strArea : item.strCategory;
                }}
              >
                <Text
                  style={{
                    color: COLORS.onbackground,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {item.strCategory == null ? item.strArea : item.strCategory}
                </Text>
              </Pressable>
            );
          }}
        />
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
      <FlatList
        data={results}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View>
            {/*App Bar*/}
            {renderPageHeader()}
            {/*Search Bar*/}
            {renderSearchBar()}

            {query ? (
              <>{renderTitle("Search Results")}</>
            ) : (
              <>
                {renderTitle("Recent Searches")}
                {/*Search by Category*/}
                {renderTitle("Search by Category")}
                {renderCategories(categories)}
                {/*Search by Country*/}
                {renderTitle("Search by Country")}
                {renderCategories(countries)}
              </>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              marginHorizontal: 20,
              marginVertical: 10,
              // add shadow
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
            }}
            onPress={() => navigation.navigate("Recipe", { idMeal: item.idMeal })}
          >
            <Image
              source={{ uri: item.strMealThumb }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 160,
              }}
            />
            {/* bold text for title */}
            <View
              style={{
                position: "absolute",
                bottom: 30,
                left: 20,
              }}
            >
              <Text
                style={{
                  width: 240,
                  color: COLORS.white,
                  ...FONTS.h1,
                  fontSize: 16,
                }}
                numberOfLines={1}
                ellipsizeMode
              >
                {item.strMeal}
              </Text>
            </View>
            {/* Text for Category + Area */}
            <View
              style={{
                position: "absolute",
                bottom: 10,
                left: 20,
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  height: 28,
                  flexBasis: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  color: COLORS.white,
                  ...FONTS.body,
                }}
              >
                View full recipe
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={COLORS.white}
                />
              </Text>
            </View>
          </Pressable>
        )}
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

export default Browse;
