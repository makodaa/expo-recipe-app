import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView, Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, DARK, SIZES, FONTS } from '../constants/index';
import { CustomButton } from '../assets/components';
import { render } from 'react-dom';

const Browse = ({navigation}) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const insets = useSafeAreaInsets();

  const getResults = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`);
    const data = await response.json();
    console.log(data);
    console.log(typeof data);
    setResults(data['meals']);
  }

  const urlCategories = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await fetch(urlCategories);
    const data = await response.json();

    console.log(data);
    setCategories(data['meals']);
  }

  const urlCountries = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    const response = await fetch(urlCountries);
    const data = await response.json();

    console.log(data);
    setCountries(data['meals']);
  }
  useEffect(() => {
    getCategories();
    getCountries();
  }, []);

  useEffect(() => {
    getResults();
  }
  , [query]);
  
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
        <View>
          <Pressable
          style = {{
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.transparent,
          }}
          onPress={() => navigation.goBack()}
          >
          <MaterialCommunityIcons name="arrow-left" size={22} color={COLORS.onsurfacevariant} />
          </Pressable>
        </View>
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
          <MaterialCommunityIcons name="magnify" size={18} color={COLORS.onsurfacevariant} />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 10,
              color: COLORS.onsurfacevariant,
            }}
            placeholder="Search Recipes"
            onChange={e => setQuery(e.target.value)}
          />
        </View>
      </View>

    )
  }

  const renderCategories = (data) => {
    return (
      <View
      style={{
        marginHorizontal: 20
      }}
    >
      <FlatList
        data = {data}
        numColumns={4}
        columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
              <CustomButton
                category = {item['strCategory'] == null ? item['strArea'] : item['strCategory']}
              ></CustomButton>
          );
        }
      }
      />
      </View>
      )
    };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.surface,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }}>
      <FlatList
      data = {results}
      keyExtractor={(item,index) => index.toString()}
      ListHeaderComponent={
        <View>
        {/*App Bar*/}
        {renderSearchBar()}
        {/*Recent Searches*/}
        {renderTitle("Recent Searches")}
        {/*Search by Category*/}
        {renderTitle("Search by Category")}
        {renderCategories(categories)}
        {/*Search by Country*/}
        {renderTitle("Search by Country")}
        {renderCategories(countries)}

        </View>
        }
      renderItem={({item}) => (
        <View>
          <Text
          style = {{
            color: COLORS.onsurface,
            fontSize: 20,
            marginHorizontal: 20,
          }}
          >{item.strMeal}</Text>
        </View>
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
  )
}

export default Browse