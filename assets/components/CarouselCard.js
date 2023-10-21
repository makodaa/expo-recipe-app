import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native'

const DetailContents = ({recipeItem}) => {
  return (
    <View
      style = {{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        }}
    >
      <Text
      style = {{
        width: '70%',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
      }}>
        {recipeItem.strMeal}
      </Text>

    </View>
  )
}
const CarouselCardDetails = ({recipeItem}) => {
  return (
    <View
      style = {{
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        height: 100,
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
        height: 350,
        width: 250,
        marginTop: 20,
        marginRight: 20,
        borderRadius: 20,
        ...containerStyle,
      }}
      onPress = {onPress}
    >
        <Image
        source = {recipeItem.strMealThumb}
        resizeMode = 'cover'
        style = {{
            width: '100%',
            height: '100%',
            borderRadius: 20
        }}
        >
        </Image>
        <View>
          <CarouselCardDetails
          recipeItem={recipeItem}
          />
        </View>
    </TouchableOpacity>
  )
}

export default CarouselCard