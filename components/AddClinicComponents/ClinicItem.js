import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import constants from "../../constants/Constants";

const ClinicItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    paddingVertical: 15,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: constants.screenWidth - 30,
    height: constants.screenHeight - 200,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    borderColor: Colors.secondary,
    borderWidth: 1,
  },
  infoContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 39,
    paddingVertical: 10,
  },
  title: {
    color: Colors.secondary,
    fontSize: 18,
    fontFamily: "open-sans-bold",
    textTransform: "uppercase",
    marginBottom: 2,
  },
});

export default ClinicItem;
