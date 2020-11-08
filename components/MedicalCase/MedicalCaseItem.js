import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import constants from "../../constants/Constants";

const MedicalCaseItem = (props) => {
  const { createdAt, onPress } = props;
  const words = createdAt.split("T");
  const data = words[0];

  return (
    <View style={styles.item}>
      <View style={styles.touchable}>
        <TouchableOpacity onPress={onPress}>
          <View>
            <View style={styles.dateContainer}>
              <Text style={styles.details}>Created at:</Text>
              <Text style={styles.details}>{data}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    height: 80,
    width: constants.screenWidth - 60,
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },

  dateContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  details: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: Colors.details,
    marginHorizontal: 15,
  },
});

export default MedicalCaseItem;
