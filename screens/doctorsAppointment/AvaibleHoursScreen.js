import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { arrayOfAvaibleHours } from '../../helpers/arrayOfAvaibleHours';
import Houritem from '../../components/AppointmentComponents/HourItem';
import * as medicalVisitActions from '../../store/actions/medicalVisit';
import { useDispatch } from 'react-redux';
import Button from '../../UI/Button';
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
          text: 'zapisz mnie',
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
      <Text>Termin: </Text>
      <FlatList
        horizontal={true}
        data={arrayOfAvaibleHours}
        keyExtractor={(item) => item.hour}
        renderItem={(itemData) => (
          <Houritem
            hour={itemData.item.hour}
            onSelect={() => {
              // navigation.navigate('HomeScreen', {});
              infoHandler(day, doctorId, itemData.item.hour);
            }}
          />
        )}
      />
      {/* <Button title='Umów się' /> */}
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
});

export default AvaibleHoursScreen;
