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
  const { navigation } = props;
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
              navigation.navigate("ClinicDetailsScreen", {
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
  const { isAdmin } = navData.route.params;

  return {
    headerTitle: "Clinics",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title=""
          iconName={
            Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"
          }
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        {isAdmin == true ? (
          <Item
            title="AddClinic"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              navData.navigation.navigate("AddClinicScreen");
            }}
          />
        ) : null}
      </HeaderButtons>
    ),
  };
};
export default ClinicOverviewScreen;
