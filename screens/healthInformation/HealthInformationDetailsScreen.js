import React from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as healthInformationActions from '../../store/actions/healthInformation';
import Button from '../../UI/Button';

const healthInformationDetailsScreen = ({ route, navigation }) => {
  const {
    name,
    age,
    increase,
    locationOfPain,
    symptom,
    radiance,
    scale,
    createdAt,
    imageUri,
    healthInformationId,
    role,
  } = route.params;
  const dispatch = useDispatch();

  const checkHealthInformationHandler = (healthInformationId) => {
    Alert.alert(
      'Zapis opisu dolegliowści do konta pacjenta',
      '',
      [
        {
          text: 'Zapisz',
          onPress: () => {
            navigation.navigate('HomeScreen');
            dispatch(
              healthInformationActions.checkHealthInformation(
                healthInformationId
              )
            );
          },
        },
        {
          text: 'Anuluj',
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };
  const editTextHandler = (data) => {
    if (data === undefined) {
      data = '';
    }
    const valueOfData = data.length;
    let display = data;

    if (valueOfData == 0) {
      display = <Text>Brak danych</Text>;
    }
    return display;
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Nazwa pacjenta:</Text>
          <Text style={styles.labelContent}>{editTextHandler(name)}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Wiek:</Text>
          <Text style={styles.labelContent}>{editTextHandler(age)}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Wzrost:</Text>
          <Text style={styles.labelContent}>{editTextHandler(increase)}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Umiejscowienie bólu:</Text>
          <Text style={styles.labelContent}>
            {editTextHandler(locationOfPain)}
          </Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Główna dolegliwość:</Text>
          <Text style={styles.labelContent}>{symptom}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Promieniowanie:</Text>
          <Text style={styles.labelContent}>{editTextHandler(radiance)}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Waga:</Text>
          <Text style={styles.labelContent}>{editTextHandler(scale)}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Utworzono:</Text>
          <Text style={styles.labelContent}>{editTextHandler(createdAt)}</Text>
        </View>
        {imageUri !== undefined ? (
          <Image style={styles.image} source={{ uri: imageUri }} />
        ) : null}
      </ScrollView>
      {role === 'DOCTOR' ? (
        <Button
          title='Zapisz'
          onPress={() => {
            checkHealthInformationHandler(healthInformationId);
          }}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  scrollView: {
    backgroundColor: Colors.primary,
  },
  labelContainer: {
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderBottomColor: Colors.secondary,
  },
  labelTitle: {
    color: Colors.secondary,
    fontSize: 13,
    fontFamily: 'open-sans-bold',
    textTransform: 'uppercase',
  },
  labelContent: {
    color: Colors.details,
    fontSize: 13,
    fontFamily: 'open-sans-bold',
    textTransform: 'uppercase',
  },
  image: {
    height: 200,
    width: 200,
  },
});
export const screenOptions = (navData) => {
  return {
    title: 'Szczegóły',
  };
};
export default healthInformationDetailsScreen;
