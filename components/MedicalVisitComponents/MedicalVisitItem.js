import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import constants from '../../constants/Constants';

const MedicalVisitItem = (props) => {
  const { date, doctor, patient } = props;

  return (
    <View style={styles.item}>
      <View style={styles.touchable}>
        <View style={styles.data}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View>
            <View style={styles.details}>
              <Text style={styles.description}>Lekarz:</Text>
              <Text style={styles.doctor}>{doctor}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.description}>Pacjent:</Text>
              <Text style={styles.patient}>{patient}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    margin: 30,
    height: constants.screenHeight / 2 - 65,
    justifyContent: 'space-between',
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  data: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  date: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
    marginVertical: 10,
    color: Colors.details,
    textTransform: 'uppercase',
  },
  timeOfTaking: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    marginVertical: 2,
    color: Colors.secondary,
  },
  quantity: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    marginVertical: 2,
    color: Colors.secondary,
  },
  description: {
    fontSize: 15,
    color: Colors.secondary,
    fontFamily: 'open-sans',
  },
});

export default MedicalVisitItem;
