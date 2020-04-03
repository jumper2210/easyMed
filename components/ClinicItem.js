import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const PlaceItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 35,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 60,
    backgroundColor: "#ccc",
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 30,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  title: {
    color: "black",
    fontSize: 20,
    marginBottom: 2
  },
  address: {
    color: "#666",
    fontSize: 16
  }
});

export default PlaceItem;
