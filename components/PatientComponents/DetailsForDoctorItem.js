import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, View, Image, Text } from "react-native";
import Colors from "../../constants/Colors";
import constants from "../../constants/Constants";

const DetailsForDoctorItem = (props) => {
  const { avatar, name, onPress } = props;
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: Colors.primary,
    width: constants.screenWidth / 2 - 30,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 5,
    borderColor: Colors.secondary,
    borderWidth: 1,
    height: 230,
    marginHorizontal: 5,
  },
  avatarContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 140,
    width: 140,
    borderRadius: 140,
    backgroundColor: Colors.primary,
  },
  nameContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 25,
    textAlign: "center",
    textTransform: "uppercase",
    color: Colors.secondary,
  },
});
export default DetailsForDoctorItem;
