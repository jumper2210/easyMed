// @ts-nocheck
import React from "react"
import { ScrollView, View, StyleSheet, Text } from "react-native"
import MapPreview from "../../components/AddClinicComponents/MapPreview"
import { useSelector } from "react-redux"
import Colors from "../../constants/Colors"
import constants from "../../constants/Constants"

const ClinicDetailScreen = (props) => {
  const { route, navigation } = props
  const clinicId = route.params.placeId
  const selectedClinic = useSelector((state) =>
    state.clinicsState.clinics.find((clinic) => clinic._id === clinicId)
  )

  const selectedLocation = { lat: selectedClinic.lat, lng: selectedClinic.lng }

  const showMapHandler = () => {
    navigation.navigate("MapScreen", {
      readonly: true,
      initialLocation: selectedLocation,
    })
  }
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
  )
}

export const screenOptions = (navData) => {
  return { headerTitle: navData.route.params.ClinicTitle }
}

const styles = StyleSheet.create({
  locationContainer: {
    flex: 1,
    display: "flex",
    width: constants.screenWidth - 80,
    justifyContent: "space-around",
    alignItems: "center",
    height: constants.screenHeight - 100,
    shadowColor: "black",
    width: "100%",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    flexDirection: "column",
    marginVertical: 10,
  },
  address: {
    color: Colors.details,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "open-sans-bold",
    fontSize: 25,
    flexWrap: "wrap",
  },
  mapPreview: {
    width: "90%",
    maxWidth: 350,
    height: 350,
  },
})
export default ClinicDetailScreen
