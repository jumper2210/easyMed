import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import CustomIcon from "../UI/CustomIcon";

const NavigationItem = (props) => {
  return (
    <TouchableOpacity style={styles.item} onPress={props.onPress}>
      <View style={styles.iconContainer}>
        <CustomIcon style={styles.icon} iconName={props.iconName} />
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
    width: Dimensions.get("window").width / 2 - 2,
    paddingVertical: 40,
    flexDirection: "column",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 25,
    elevation: 15,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
  },
  icon: {
    height: 100,
    width: 100,
    backgroundColor: Colors.primary,
    alignSelf: "center",
  },
  nameContainer: {
    marginTop: 20,
    width: "100%",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});

export default NavigationItem;
