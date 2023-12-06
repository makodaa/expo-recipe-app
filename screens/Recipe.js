import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  SafeAreaView,
  ImageBackground,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTS } from "../constants/index";
import * as Linking from "expo-linking";

const Recipe = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [recipe, setRecipe] = useState([]);

  const getRecipe = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.idMeal}`
    );
    const data = await response.json();
    console.log(data);
    setRecipe(data["meals"]);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const getCookTime = (str) => {
    let totalMinutes = 0;
    let regex = /\b(\d+)\s*minutes\b/gi;
    let match;

    while ((match = regex.exec(str)) !== null) {
      totalMinutes += parseInt(match[1], 10);
    }
    return totalMinutes;
  };

  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const renderThumbnail = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 350,
          width: "100%",
        }}
      >
        <ImageBackground
          source={{ uri: recipe[0]?.strMealThumb }}
          resizeMode="cover"
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          >
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              height: 40,
              columnGap: 10,
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 30,
              backgroundColor: COLORS.transparent,
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              color={COLORS.white}
              size={18}
            />
            <Text
              style={{ color: COLORS.white, ...FONTS.body, fontSize: 18 }}
            >
              Recipe
            </Text>
          </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderDescription = () => {
    return (
      <View
        style={{
          paddingTop: 20,
        }}
      >
        <View>
          {recipe[0]?.strMeal.length > 20 ? (
            <Text
              style={{
                width: 200,
                color: COLORS.onsurface,
                marginHorizontal: 20,
                ...FONTS.h3,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {recipe[0]?.strMeal}
            </Text>
          ) : (
            <Text
              style={{
                color: COLORS.onsurface,
                marginHorizontal: 20,
                ...FONTS.h2,
              }}
            >
              {recipe[0]?.strMeal}
            </Text>
          )}
        </View>
        <View>
          <Text
            style={{
              color: COLORS.onsurface,
              marginHorizontal: 20,
              ...FONTS.body,
            }}
          >
            {recipe[0]?.strCategory} | {recipe[0]?.strArea}
          </Text>
        </View>
        {getCookTime(recipe[0]?.strInstructions) == 0 ? null : (
          <View
            style={{
              position: "absolute",
              bottom: 5,
              right: 20,
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                color: COLORS.onsurface,
                ...FONTS.body,
              }}
            >
              {getCookTime(recipe[0]?.strInstructions)} minutes
            </Text>
            <Text
              style={{
                color: COLORS.onsurface,
                ...FONTS.body,
                lineHeight: 12,
              }}
            >
              Cooking Time
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderInstructions = () => {
    return (
      <View
        style={{
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.onsurface,
            marginHorizontal: 20,
            ...FONTS.h2,
          }}
        >
          Instructions
        </Text>
        <Text
          style={{
            color: COLORS.onsurface,
            marginHorizontal: 20,
            ...FONTS.body,
            fontSize: 12,
            lineHeight: 18,
          }}
        >
          {recipe[0]?.strInstructions}
        </Text>
      </View>
    );
  };

  const renderVideoTutorial = () => {
    console.log(recipe[0]?.strYoutube.split("=")[1]);
    return (
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.onsurface,
            marginHorizontal: 20,
            ...FONTS.h2,
          }}
        >
          Video Tutorial
        </Text>
        <Pressable
          onPress={() =>
            Linking.openURL(
              `https://www.youtube.com/watch?v=${
                recipe[0]?.strYoutube.split("=")[1]
              }`
            )
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 10,
            padding: 15,
            backgroundColor: COLORS.primary,
            borderRadius: 10,
          }}
        >
          <MaterialCommunityIcons
            name="youtube"
            color={COLORS.onprimary}
            size={24}
          />
          <Text
            style={{
              color: COLORS.onprimary,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            YouTube
          </Text>
        </Pressable>
      </View>
    );
  };

  /*
   * FlatList Header: Back Button, Recipe Image, Recipe Name, Recipe Description
   * FlatList Body: Ingredients, Instructions
   */

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <FlatList
        data={recipe}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View>
            {renderThumbnail()}
            {renderDescription()}
          </View>
        }
        ListHeaderComponentStyle={{
          marginBottom: 30,
        }}
        ListFooterComponent={
          <View>
            {renderInstructions()} {renderVideoTutorial()}
          </View>
        }
        ListFooterComponentStyle={{
          marginTop: 30,
        }}
        renderItem={({ item, index }) => {
          let ingredients = [];
          let measures = [];
          for (let i = 1; i <= 20; i++) {
            if (item[`strIngredient${i}`]) {
              ingredients.push(item[`strIngredient${i}`]);
              measures.push(item[`strMeasure${i}`]);
            } else {
              break;
            }
          }
          return (
            <View>
              <Text
                style={{
                  color: COLORS.onsurface,
                  marginHorizontal: 20,
                  ...FONTS.h2,
                }}
              >
                Ingredients
              </Text>
              <FlatList
                data={ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginHorizontal: 20,
                        marginVertical: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.onsurface,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {item}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.onsurface,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {measures[index]}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Recipe;

const styles = StyleSheet.create({});
