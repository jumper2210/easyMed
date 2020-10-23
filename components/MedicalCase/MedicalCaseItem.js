import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MedicalCaseItem = (props) => {
  const { createdAt, onPress } = props;

  return (
    <View style={styles.item}>
      <View style={styles.touchable}>
        <TouchableOpacity onPress={onPress}>
          <View>
            <View style={styles.details}>
              <Text style={styles.createdAt}>{createdAt}</Text>
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
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },

  details: {
    alignItems: "center",
    padding: 10,
  },
  createdAt: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
});

export default MedicalCaseItem;
