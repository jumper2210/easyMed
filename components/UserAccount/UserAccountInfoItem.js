import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";

const UserAccountInfoItem = (props) => {
  const { name, email, phoneNumber } = props;
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 200,
  },
  name: { fontFamily: "open-sans", color: Colors.secondary, fontSize: 25 },
  email: { fontFamily: "open-sans", color: Colors.secondary, fontSize: 25 },
  phoneNumber: {
    fontFamily: "open-sans",
    color: Colors.secondary,
    fontSize: 20,
  },
});

export default UserAccountInfoItem;
