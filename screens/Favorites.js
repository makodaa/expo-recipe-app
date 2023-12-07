import React, { useState, useEffect } from "react";
import { Image, Text, View, Pressable, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from "react-native-safe-area-context";


const Favorites = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      // only get keys that are numbers (favorites)
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter(key => !isNaN(key));
      // get all values from keys
      const values = await AsyncStorage.multiGet(filteredKeys);
      // filter out null values
      const filteredValues = values.filter(value => value[1] !== null);
      // map values to objects
      const favorites = filteredValues.map(value => JSON.parse(value[1]));
      setFavorites(favorites);
    } catch (error) {
      console.error(error);
    }
  }

  const removeFavorite = async (id) => {
    try {
      await AsyncStorage.removeItem(id);
      getFavorites();
    } catch (error) {
      console.error(error);
    }
  };

  const renderPageHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={COLORS.primary}
          />
        </Pressable>
        <Text style={{ ...FONTS.h2, color: COLORS.primary }}> Favorites </Text>
        <View style={{ width: 24 }} ></View>
      </View>
    );
  }

  const renderItem=({ item }) => (
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
          ellipsizeMode="tail"
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
      {/* heart icon */}
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 20,
        }}
      >
        <Pressable
          onPress={() => removeFavorite(item.idMeal)}
        >
          <MaterialCommunityIcons name='heart' size={24} color={COLORS.primary} />
        </Pressable>
      </View>
    </Pressable>
  );
  const refreshButton = () => {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: 60,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          right: 30,
          bottom: 80,
          backgroundColor: COLORS.primary,
          borderRadius: 30,
          elevation: 10
        }}
        onPress={() => getFavorites()}
      >
        <MaterialCommunityIcons name="reload" size={24} color={COLORS.white} />
      </TouchableOpacity>
    )
  }

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
        data={favorites}
        extraData={favorites}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.idMeal}
        ListHeaderComponent={
          <>
            {renderPageHeader()}
            {
              favorites.length === 0 &&
              <View
                style={{
                  flex: 1,
                  height: 300,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: SIZES.padding * 2
                }}
              >
                <Text style={{ ...FONTS.h2, color: COLORS.onsurfacevariant }}>No Favorites Yet</Text>
              </View>
            }
          </>}
        renderItem={renderItem}
      />
      {refreshButton()}
    </SafeAreaView>
  )
}

export default Favorites
