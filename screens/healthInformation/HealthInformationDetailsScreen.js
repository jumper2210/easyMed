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
  const words = createdAt.split('T');
  const date = words[0];
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

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Nazwa pacjenta:</Text>
          <Text style={styles.labelContent}>{name}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Główna dolegliwość:</Text>
          <Text style={styles.labelContent}>{symptom}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Wiek:</Text>
          <Text style={styles.labelContent}>{age}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Wzrost:</Text>
          <Text style={styles.labelContent}>{increase}</Text>
        </View>
        {scale ? (
          <View style={styles.labelContainer}>
            <Text style={styles.labelTitle}>Waga:</Text>
            <Text style={styles.labelContent}>{scale}</Text>
          </View>
        ) : null}

        {locationOfPain ? (
          <View style={styles.labelContainer}>
            <Text style={styles.labelTitle}>Umiejscowienie bólu:</Text>
            <Text style={styles.labelContent}>{locationOfPain}</Text>
          </View>
        ) : null}
        {radiance ? (
          <View style={styles.labelContainer}>
            <Text style={styles.labelTitle}>Promieniowanie:</Text>
            <Text style={styles.labelContent}>{radiance}</Text>
          </View>
        ) : null}

        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Utworzono:</Text>
          <Text style={styles.labelContent}>{date}</Text>
        </View>
        {imageUri !== undefined ? (
          <Image style={styles.image} source={{ uri: imageUri }} />
        ) : null}
      </ScrollView>
      {role === 'DOCTOR' ? (
        <Button
          title='Zapisz do historii pacjenta'
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
    padding: 20,
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
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    textTransform: 'uppercase',
  },
  labelContent: {
    color: Colors.details,
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    textTransform: 'uppercase',
    paddingLeft: 15,
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
