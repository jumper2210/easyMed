import React from "react";
import { View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomIcon = (props) => {
  return (
    <View>
      <Ionicons name={props.iconName} size={53} color={"white"} />
    </View>
  );
};

export default CustomIcon;
