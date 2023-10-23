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
        height: 350,
        width: 250,
        marginTop: 20,
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
    </TouchableOpacity>
  )
}

export default CarouselCard