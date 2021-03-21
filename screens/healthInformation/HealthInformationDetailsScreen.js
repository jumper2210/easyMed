import React from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Button from '../../UI/Button';
import { ScrollView } from 'react-native-gesture-handler';
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

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>Nazwa pacjenta:</Text>
          <Text style={styles.labelContent}>{name}</Text>
        </View>
        <ScrollView>
          <View style={styles.symptomContainer}>
            <Text style={styles.labelTitle}>Opis dolegliwości:</Text>
            <Text style={styles.symptomLabelContent}>{symptom}</Text>
          </View>
        </ScrollView>
        {weight ? (
          <View style={styles.labelContainer}>
            <Text style={styles.labelTitle}>Waga:</Text>
            <Text style={styles.labelContent}>{weight}</Text>
          </View>
        ) : null}
        {doctorNotes ? (
          <ScrollView>
            <View style={styles.symptomContainer}>
              <Text style={styles.labelTitle}>Uwagi od lekarza:</Text>
              <Text style={styles.symptomLabelContent}>{doctorNotes}</Text>
            </View>
          </ScrollView>
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
    padding: 30,
  },
  scrollView: {
    backgroundColor: Colors.primary,
  },
  symptomContainer: {
    padding: 20,
    flexDirection: 'column',
    borderBottomWidth: 0.4,
    borderBottomColor: Colors.secondary,
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
  symptomLabelContent: {
    color: Colors.details,
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    paddingTop: 15,
    marginVertical: 5,
  },
  labelContent: {
    color: Colors.details,
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    paddingLeft: 15,
  },
  image: {
    height: 200,
    width: 200,
  },
});
export const screenOptions = (navData) => {
  return {
    title: 'Szczegóły dolegliwości',
  };
};
export default healthInformationDetailsScreen;
