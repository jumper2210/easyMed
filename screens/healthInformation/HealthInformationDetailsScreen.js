import React from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import Button from '../../UI/Button';

const healthInformationDetailsScreen = ({ route, navigation }) => {
  const {
    name,
    symptom,
    weight,
    doctorNotes,
    createdAt,
    imageUri,
    healthInformationId,
    role,
  } = route.params;
  const words = createdAt.split('T');
  const date = words[0];
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Nazwa pacjenta:</Text>
          <Text style={styles.labelContent}>{name}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Opis dolegliwości:</Text>
          <Text style={styles.labelContent}>{symptom}</Text>
        </View>
        {weight ? (
          <View style={styles.labelContainer}>
            <Text style={styles.labelTitle}>Waga:</Text>
            <Text style={styles.labelContent}>{weight}</Text>
          </View>
        ) : null}
        {doctorNotes ? (
          <View style={styles.labelContainer}>
            <Text style={styles.labelTitle}>Uwagi od lekarza:</Text>
            <Text style={styles.labelContent}>{doctorNotes}</Text>
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
          title='Dodaj swoje uwagi'
          onPress={() => {
            navigation.navigate('AddHealthNotesScreen', {
              healthInformationId: healthInformationId,
            });
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
