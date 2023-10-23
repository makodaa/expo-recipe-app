import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Browse = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const insets = useSafeAreaInsets();

  const getResults = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`);
    const data = await response.json();
    console.log(data)
    setResults(data['meals']);
  }

  useEffect(() => {
    getResults();
  }
  , [query]);
  

  const renderSearchBar = () => {
    return(
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          height: 40,
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
          onChange={e => setQuery(e.target.value)}
          placeholder="Demo Search Bar"
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#18181b",
      paddingTop: insets.top + 20,
      paddingBottom: insets.bottom + 20,
    }}>
      <FlatList
      data = {results}
      keyExtractor={(item,index) => index.toString()}
      renderItem={({item}) => (
        <View>
          <Text
          style = {{
            color: "#fff",
            fontSize: 20,
            marginHorizontal: 20,
          }}
          >{item.strMeal}</Text>
        </View>
      )}
      ListHeaderComponent={
        <View>
        {renderSearchBar()}
        </View>
        }
      />
    </SafeAreaView>
  )
}

export default Browse