import React from 'react'
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native'
import { dummyData } from '../constants'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      data = {dummyData.categories}
      keyExtractor = {item => `${item.id}`}
      keyboardDismissMode='on-drag'
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View></View>
      }
      renderItem={({item, index}) => {
        return (
          <View>
            <Text style ={{color:'#fff'}}>{item.name}</Text>
          </View>
        )
      }}
      ListFooterComponent={
        <View
          style={{
            marginBottom: 100
          }}
        ></View>
      }
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b"
  }
})