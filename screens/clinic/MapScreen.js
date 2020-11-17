import React, { useState, useEffect, useCallback } from "react"
import { StyleSheet, Text, Platform } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { TouchableOpacity } from "react-native-gesture-handler"
import Colors from "../../constants/Colors"

const MapScreen = (props) => {
  const { navigation, route } = props
  const initialLocation = route.params ? route.params.initialLocation : null

  const readonly = route.params ? route.params.readonly : null

  const [selectedLocation, setSelectedLocation] = useState(initialLocation)
  let markerCoordinates

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectedLocationHandler = (event) => {
    if (readonly) {
      return
    }

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return
    }
    navigation.navigate("AddClinicScreen", {
      pickedLocation: selectedLocation,
    })
  }, [selectedLocation])

  useEffect(() => {
    let readonly = route.params ? route.params.readonly : null
    navigation.setOptions(
      readonly === false
        ? {
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={savePickedLocationHandler}
              >
                <Text style={styles.headerButtonText}>Save</Text>
              </TouchableOpacity>
            ),
          }
        : {
            headerRight: () => {},
          }
    )
  }, [savePickedLocationHandler, readonly])

  if (selectedLocation) {
    markerCoordinates = {
      latitude: Number(selectedLocation.lat),
      longitude: Number(selectedLocation.lng),
    }
  }
  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectedLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  )
}

export const screenOptions = () => {
  return {}
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? Colors.secondary : "",
  },
})
export default MapScreen
