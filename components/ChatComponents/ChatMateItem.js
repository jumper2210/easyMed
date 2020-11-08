import React from "react";
import { StyleSheet, Text } from "react-native";
import Constants from "../../constants/Constants";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";

const ChatMateItem = (props) => {
  const { name, onSelect } = props;
  return (
    <TouchableOpacity onPress={onSelect} style={styles.container}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 80,
    width: Constants.screenWidth - 80,
    borderBottomColor: Colors.details,
    borderBottomWidth: 1,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    shadowColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },

  name: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    marginHorizontal: 14,
    color: Colors.details,
    textAlign: "center",
  },
});

export default ChatMateItem;
