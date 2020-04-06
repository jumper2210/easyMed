import React, { useEffect } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../UI/HeaderButton";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import ClinicItem from "../../components/ClinicItem";
import * as clinicsActions from "../../store/actions/clinics/clinics-actions";

const AddPlaceScreen = (props) => {
  const clinics = useSelector((state) => state.clinics.clinics);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clinicsActions.loadClinics());
  }, [dispatch]);

  return (
    <FlatList
      data={clinics}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ClinicItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate("ClinicDetail", {
              clinicTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

export const screenOptions = (navData) => {
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
    ),
  };
};
const styles = StyleSheet.create({});
export default AddPlaceScreen;
