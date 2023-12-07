import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Pressable
} from 'react-native';
import { COLORS } from '../../constants';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailContents = ({recipeItem}) => {
  return (
    <View
      style = {{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        }}
    >
      <Text
      style = {{
        width: '100%',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      }}>
        {recipeItem.strMeal}
      </Text>
      <Text>
      </Text>
    </View>
  )
}
const CarouselCardDetails = ({recipeItem}) => {
  return (
    <View
      style = {{
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}
    >
      <DetailContents
        recipeItem = {recipeItem}
      />
    </View>
  )
}

const CarouselCard = ({containerStyle, recipeItem, onPress}) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(recipeItem.idMeal).then((value) => {
      if (value !== null) {
        setStatus('heart');
      } else {
        setStatus('heart-outline');
      }
    });
  }, []);

  return (
    <TouchableOpacity
    style = {{
        height: 450,
        width: 250,
        marginRight: 20,
        borderRadius: 5,
        ...containerStyle,
      }}
      onPress = {onPress}
    >
        <Image
        source = {{uri:recipeItem.strMealThumb}}
        resizeMode = 'cover'
        style = {{
            width: '100%',
            height: '100%',
            borderRadius: 5
        }}
        >
        </Image>
        <View>
          <CarouselCardDetails
          recipeItem={recipeItem}
          />
        </View>
        <View
        style = {{
          position: 'absolute',
          top: 20,
          left: 15,
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: COLORS.transparentblack,
          borderRadius: 5,
        }}
        >
          <Text
          style = {{
            color: COLORS.white,
            fontSize: 13,
            fontWeight: 'bold',
          }}
          >
            {recipeItem.strCategory}
          </Text>
        </View>
        <View
        style = {{
          position: 'absolute',
          top: 20,
          right: 15,
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: COLORS.transparent,
        }}>
          <Pressable
              onPress={() => {
                AsyncStorage.getAllKeys().then((keys) => {
                  AsyncStorage.multiGet(keys).then((result) => {
                    console.log(result); 
                  });
                });
                if (status === 'heart-outline') {
                  AsyncStorage.setItem(recipeItem.idMeal, JSON.stringify(recipeItem));
                  setStatus('heart');
                } else {
                  AsyncStorage.removeItem(recipeItem.idMeal);
                  setStatus('heart-outline');
                }
              }}
          >
              <MaterialCommunityIcons name={status} size={24} color={COLORS.primary} />
          </Pressable>
        </View>
    </TouchableOpacity>
  )
}

export default CarouselCard