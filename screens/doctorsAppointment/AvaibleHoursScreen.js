import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { arrayOfAvaibleHours } from '../../helpers/arrayOfAvaibleHours';
import Houritem from '../../components/MedicalVisitComponents/HourItem';
import * as medicalVisitActions from '../../store/actions/medicalVisit';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

const AvaibleHoursScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { day, doctorId } = route.params;

  const infoHandler = (day, doctorId, hour) => {
    Alert.alert(
      'Jesteś pewien, że chcesz zapisać się na wizytę w tym dniu?',
      ``,
      [
        {
          text: 'Zapisz mnie',
          onPress: () => {
            dispatch(
              medicalVisitActions.createMedicalVisit(day, doctorId, hour)
            );
            navigation.navigate('HomeScreen');
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
      <Text style={styles.text}>Termin: </Text>
      <FlatList
        data={arrayOfAvaibleHours}
        keyExtractor={(item) => item.hour}
        renderItem={(itemData) => (
          <Houritem
            hour={itemData.item.hour}
            onSelect={() => {
              infoHandler(day, doctorId, itemData.item.hour);
            }}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
    color: Colors.secondary,
  },
});

export default AvaibleHoursScreen;
