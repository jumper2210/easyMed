import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import Color from "../constants/Colors";

const Button = (props) => {
  const {
    title = "Enter",
    style = {},
    textStyle = {},
    onPress,
    isLoading,
  } = props;

  const loader = () => {
    return <ActivityIndicator animating={isLoading} />;
  };
  const button = () => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={[styles.text, textStyle]}> {title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.button, style]}>
      {isLoading ? loader() : button()}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: Color.secondary,
    shadowColor: "#rgb(0,0,0)",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 10 },
    shadowRadius: 20,
  },
  text: {
    fontSize: 13,
    textTransform: "uppercase",
    color: Color.white,
  },
});

export default Button;
