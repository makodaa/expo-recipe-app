import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Build = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [query, setQuery] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
      );
      const data = await response.json();
      //remove duplicates, slice to 50
      data.meals = data.meals.filter(
        (thing, index, self) =>
          index ===
          self.findIndex((t) => t.strIngredient === thing.strIngredient)
      );
      setIngredients(data.meals.slice(0, 30));
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

const fetchRecipeDetails = async (name) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
    );
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
};

  const handleSelections = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handleSearch = async () => {
    let recipes = [];
    for (let id of selectedIds) {
      let fetchedRecipes = await fetchRecipeDetails(ingredients[id - 1]?.strIngredient);
      recipes = [...recipes, ...fetchedRecipes];
    }
    setRecipes(recipes);
    console.log("recipes", recipes);
  }

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
          paddingBottom: 40,
          backgroundColor: COLORS.transparent,
        }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          color={COLORS.onsurface}
          size={18}
        />
        <Text style={{ color: COLORS.onsurface, ...FONTS.body, fontSize: 18 }}>
          Build
        </Text>
      </Pressable>
    </View>
  );

  const renderListItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelections(item.idIngredient)}
      style={{
        backgroundColor: selectedIds.includes(item.idIngredient)
          ? COLORS.primary
          : COLORS.surface,
        height: 100,
        width: 100,
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
      }}
    >
      <View>
        <Image
          style={{ height: 60, width: 60 }}
          source={{
            uri: `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png`,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            color: selectedIds.includes(item.idIngredient)
              ? COLORS.white
              : COLORS.black,
            ...FONTS.body,
            fontSize: 12,
            width: 70,
            lineHeight: 16,
            textAlign: "center",
          }}
          numberOfLines={1}
          ellipsizeMode="trail"
        >
          {item.strIngredient}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSearchButton = () => {
    return (
      <View>
        <Pressable
          onPress={() => handleSearch()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: COLORS.surface, ...FONTS.body }}>Search</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.surface,
        justifyContent: "center",
      }}
    >
      {recipes.length > 0 ? (
          <FlatList
          key={'_'}
            data={recipes}
            extraData={selectedIds}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => "_" + item.idMeal}
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
            />
      ) : (
        <FlatList
        key={'#'}
          data={ingredients}
          extraData={selectedIds}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => "#" + item.idIngredient}
          renderItem={renderListItem}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          contentContainerStyle={{
            flex: 1,
            alignContent: "space-between",
            rowGap: 30,
            columnGap: 30,
          }}
          ListHeaderComponent={
            <View>
              {renderPageHeader()}
              {renderSearchButton()}
            </View>
          }
          ListFooterComponent={<></>}
          ListFooterComponentStyle={{ paddingBottom: 200, marginBottom: 100 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Build;
