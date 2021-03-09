import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Colors from '../../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.route.params
    ? props.route.params.pickedLocation
    : null;

  const { onLocationPicked } = props;
  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Problem ze zgodą.',
        'Musisz zezwolić na udostępnienie twojej lokalizacji.',
        [{ text: 'Ok' }]
      );
      return false;
    }
    return true;
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('MapScreen', {
      readonly: false,
    });
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        'Nie pobrano lokalizacji!',
        'Spróbuj ponownie, albo wybierz miejsce na mapie.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <Text>Nie wybrano jeszcze lokalizacji!</Text>
        )}
      </MapPreview>

      <View style={styles.actions}>
        <Button
          title='Pobierz lokalizację'
          color={Colors.secondary}
          onPress={getLocationHandler}
        />
        <Button
          title='Wybierz na mapie'
          color={Colors.secondary}
          onPress={pickOnMapHandler}
          style={{ borderLeft: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },

  mapPreview: {
    marginTop: 10,
    marginBottom: 15,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
export default LocationPicker;
