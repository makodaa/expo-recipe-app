import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { COLORS, DARK, SIZES, FONTS } from "../../constants/index";

const CustomButton = (category, {onPressEvent}, buttonStyle) => {
  return (
    <TouchableOpacity
      style={{
      alignItems: "center",
      elevation: 8,
      backgroundColor: COLORS.primary,
      marginRight: 10,
      borderRadius: 4,
      paddingVertical: 10,
      paddingHorizontal: 14,
      }}
    >
      <Text
        style={{
          color: COLORS.onbackground,
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
