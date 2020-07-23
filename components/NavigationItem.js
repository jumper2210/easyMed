import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
const NavigationItem = (props) => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{props.icon}</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.secondary,
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 35,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    height: 100,
    width: 100,
    backgroundColor: Colors.primary,
    alignSelf: "center",
  },
  nameContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 25,
  },
});

export default NavigationItem;
