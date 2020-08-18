import React from "react";
import { ScrollView, Image, View, StyleSheet, Text } from "react-native";
import MapPreview from "../../components/AddClinicComponents/MapPreview";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import constants from "../../constants/Constants";

const ClinicDetailScreen = (props) => {
  const clinicId = props.route.params.placeId;
  const selectedClinic = useSelector((state) =>
    state.clinicsState.clinics.find((clinic) => clinic._id === clinicId)
  );

  const selectedLocation = { lat: selectedClinic.lat, lng: selectedClinic.lng };

  const showMapHandler = () => {
    props.navigation.navigate("MapScreen", {
      readonly: true,
      initialLocation: selectedLocation,
    });
  };
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedClinic.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={{ lat: selectedClinic.lat, lng: selectedClinic.lng }}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return { headerTitle: navData.route.params.ClinicDetail };
};

const styles = StyleSheet.create({
  locationContainer: {
    flex: 1,
    marginVertical: 20,
    display: "flex",
    width: constants.screenWidth - 80,
    justifyContent: "center",
    alignItems: "center",
    height: constants.screenHeight - 200,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 30,
  },
  address: {
    color: Colors.details,
    textAlign: "center",
    textTransform: "uppercase",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 350,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
export default ClinicDetailScreen;
