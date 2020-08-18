import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Constants from "../../constants/Constants";
import Color from "../../constants/Colors";
import Colors from "../../constants/Colors";

const GroupsItem = (props) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.groupTitle}>{props.groupName}</Text>
          {/* <Text style={styles.groupMembers}>{item.groupMembers}</Text> */}
        </View>
      </View>
    </View>
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
  descriptionContainer: {
    margin: 5,
  },
  Image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: "#ccc",
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 2,
    backgroundColor: Color.theme,
  },
  groupTitle: {
    fontSize: 14,
    fontFamily: "open-sans-bold",
    marginHorizontal: 10,
    color: Colors.details,
  },
  groupMembers: {
    color: Color.smoke,
    fontSize: 14,
  },
});

export default GroupsItem;
