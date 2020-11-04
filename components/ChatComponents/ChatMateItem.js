import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Constants from "../../constants/Constants";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";

const ChatMateItem = (props) => {
  const { name, onSelect } = props;
  return (
    <TouchableOpacity onPress={onSelect} style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 80,
    width: Constants.screenWidth - 80,
    borderBottomColor: "rgb(0,0,0)",
    borderBottomWidth: 0.2,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    shadowColor: "#ccc",
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 2,
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },

  name: {
    fontSize: 14,
    fontFamily: "open-sans-bold",
    marginHorizontal: 10,
    color: Colors.details,
    textAlign: "center",
  },
});

export default ChatMateItem;
