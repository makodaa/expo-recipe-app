import React from 'react'
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
import { useNavigation } from '@react-navigation/native';
import Recipe from '../../screens/index';
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
          <Pressable>
          <MaterialCommunityIcons name="heart-outline" size={28} color={COLORS.white} />
          </Pressable>
        </View>
    </TouchableOpacity>
  )
}

export default CarouselCard