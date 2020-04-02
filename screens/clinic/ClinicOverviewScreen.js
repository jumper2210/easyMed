import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../UI/HeaderButton";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import ClinicItem from "../../components/ClinicItem";

const AddPlaceScreen = props => {
  const clinics = useSelector(state => state.clinics.clinics);
  return (
    <FlatList
      data={clinics}
      renderItem={itemData => (
        <ClinicItem
          image={null}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate("ClinicDetail", {
              clinicTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }}
        />
      )}
    />
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: "Clinics",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="AddClinic"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("AddClinic");
          }}
        />
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" }
});
export default AddPlaceScreen;
