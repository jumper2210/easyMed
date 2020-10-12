import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../UI/CustomHeaderButton";
import NavigationItem from "../components/NavigationItem";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.NavItemStyle}>
        <NavigationItem
          name={"Create chat room"}
          iconName={
            Platform.OS === "android"
              ? "md-add-circle-outline"
              : "ios-add-circle-outline"
          }
          onPress={() => {
            navigation.navigate("FormScreen");
          }}
        />
        <NavigationItem
          name={"Clinic"}
          iconName={Platform.OS === "android" ? "md-medical" : "ios-medical"}
          onPress={() => {
            navigation.navigate("ClinicScreen");
          }}
        />
        <NavigationItem
          name={"Chat room"}
          iconName={
            Platform.OS === "android" ? "md-chatboxes" : "ios-chatboxes"
          }
          onPress={() => {
            navigation.navigate("ChatGroupsScreen");
          }}
        />
      </View>
    </ScrollView>
  );
};
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
  NavItemStyle: {
    padding: 1,
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
});

export default HomeScreen;
