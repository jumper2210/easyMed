import React from "react";
import { ScrollView, Image, View, StyleSheet, Text } from "react-native";
import MapPreview from "../../components/MapPreview";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

const ClinicDetailScreen = (props) => {
  const clinicId = props.route.params.placeId;
  const selectedClinic = useSelector((state) =>
    state.clinics.clinics.find((clinic) => clinic.id === clinicId)
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
      <Image source={{ uri: selectedClinic.imageUri }} style={styles.image} />
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
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.secondary,
    textAlign: "center",
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
