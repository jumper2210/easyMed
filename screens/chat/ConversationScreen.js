import React from "react";
import { StyleSheet, Text } from "react-native";
const ConversationScreen = (props) => {
  return <Text style={styles.screen}>CONVERSATION</Text>;
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ConversationScreen;
