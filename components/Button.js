import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import Colors from "../constants/Colors";

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
    shadowColor: "#ccc",
    backgroundColor: Colors.details,
  },
  text: {
    fontSize: 13,
    textTransform: "uppercase",
    color: Colors.primary,
  },
});

export default Button;
