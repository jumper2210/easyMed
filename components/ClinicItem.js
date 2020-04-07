import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const PlaceItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.address}>{props.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: "#323210",
    borderBottomWidth: 1,
    paddingVertical: 35,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 70,
    backgroundColor: "#ccc",
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 30,
    width: 140,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 2,
  },
  address: {
    color: "#665",
    fontSize: 15,
  },
  textContainer: {
    marginVertical: 3,
    marginRight: 2,
  },
});

export default PlaceItem;
