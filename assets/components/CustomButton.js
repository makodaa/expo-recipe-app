import { TouchableOpacity, Text, View } from "react-native";
import React from "react";

const CustomButton = (category, onPress) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
          alignItems: "center",
          elevation: 8,
          backgroundColor: "#fff",
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 12,
          marginLeft: 20
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        {category.category}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton;
