import React, { useEffect } from "react";
import { Platform, ActivityIndicator, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../UI/CustomHeaderButton";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import ClinicItem from "../../components/AddClinicComponents/ClinicItem";
import * as clinicsActions from "../../store/actions/clinics";
import Colors from "../../constants/Colors";

const ClinicOverviewScreen = (props) => {
  const clinics = useSelector((state) => state.clinicsState.clinics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clinicsActions.loadClinics());
  }, [dispatch]);

  let display = <ActivityIndicator size="large" color={Colors.secondary} />;
  if (clinics) {
    display = (
      <FlatList
        data={clinics}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <ClinicItem
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={itemData.item.address}
            onSelect={() => {
              props.navigation.navigate("ClinicDetail", {
                clinicTitle: itemData.item.title,
                placeId: itemData.item._id,
              });
            }}
          />
        )}
      />
    );
  }

  return <View>{display}</View>;
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Clinics",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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
export default ClinicOverviewScreen;
