import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../UI/CustomHeaderButton";
import { LinearGradient } from "expo-linear-gradient";

const StartupScreen = (props) => {
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Witaj w Easy-Med</Text>
        </View>
      </LinearGradient>
    </View>
  );

export const screenOptions = (navData) => {
  return {
    headerTitle: "Home",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    paddingTop: 200,
  },
  title: {
    fontSize: 25,
    color: "white",
  },
});

export default StartupScreen;
