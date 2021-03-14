import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import constants from '../../constants/Constants';
import * as doctorActions from '../../store/actions/doctor';
import Button from '../../UI/Button';
const DoctorMedicalVisitItem = (props) => {
  const dispatch = useDispatch();
  const {
    date,
    patientName,
    patientMail,
    patientPhoneNumber,
    patientId,
    avatar,
    _id,
    role,
    navigation,
    hour,
    medicalVisitId,
  } = props;

  let display = null;
  let currentDay = new Date();
  let visitDate = new Date(date);

  if (visitDate.getTime() < currentDay.getTime()) {
    display = (
      <View style={styles.itemAfterDate}>
        <View style={styles.touchable}>
          <View style={styles.data}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View>
              <View style={styles.details}>
                <Text style={styles.description}>Godzina wizyty:</Text>
                <Text style={styles.quantity}>{hour}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.description}>Pacjent:</Text>
                <Text style={styles.quantity}>{patientName}</Text>
              </View>
            </View>
          </View>
          <Button
            style={{ marginVertical: 20 }}
            title='Usuń wizytę'
            onPress={() => {
              dispatch(
                doctorActions.deleteDoctorMedicalVisit(
                  medicalVisitId,
                  patientId
                )
              );
              navigation.navigate('HomeScreen', {});
            }}
          />
        </View>
      </View>
    );
  } else {
    display = (
      <View style={styles.item}>
        <View style={styles.touchable}>
          <View style={styles.data}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View>
              <View style={styles.details}>
                <Text style={styles.description}>Pacjent:</Text>
                <Text style={styles.quantity}>{patientName}</Text>
              </View>
            </View>
          </View>
          <Button
            style={{ marginVertical: 20 }}
            title='Szczegóły pacjenta'
            onPress={() => {
              navigation.navigate('PatientDataScreen', {
                avatar: avatar,
                patientName: patientName,
                patientMail: patientMail,
                patientPhoneNumber: patientPhoneNumber,
                patientId: patientId,
                _id: _id,
                role: role,
              });
            }}
          />
        </View>
      </View>
    );
  }

  return <View>{display}</View>;
};

const styles = StyleSheet.create({
  item: {
    width: constants.screenWidth - 40,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    margin: 30,
    height: constants.screenHeight / 2 - 105,
    justifyContent: 'space-between',
    padding: 10,
  },
  itemAfterDate: {
    width: constants.screenWidth - 40,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#272121',
    margin: 30,
    height: constants.screenHeight / 2 - 105,
    justifyContent: 'space-between',
    padding: 10,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },

  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  quantity: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    color: Colors.secondary,
  },
  description: {
    fontSize: 22,
    color: Colors.secondary,
    fontFamily: 'open-sans-bold',
  },
});

export default DoctorMedicalVisitItem;
