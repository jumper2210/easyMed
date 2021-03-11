import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import PatientMedicalVisitItem from '../../components/MedicalVisitComponents/PatientMedicalVisitItem';
import Colors from '../../constants/Colors';
import * as patientActions from '../../store/actions/patient';
import Button from '../../UI/Button';

const AppoinmentsScreen = ({ navigation, route }) => {
  const patientData = useSelector(
    (state) => state.patientsState.patientMedicalVisits
  );
  let display = <ActivityIndicator size='large' color={Colors.secondary} />;
  const { _id } = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(patientActions.loadPatientMedicalVisits());
    });
    return unsubscribe;
  }, []);

  if (patientData) {
    display = (
      <FlatList
        contentContainerStyle={styles.list}
        data={patientData}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <View>
            <PatientMedicalVisitItem
              date={itemData.item.date}
              doctorName={itemData.item.doctor.name}
            />
            <Button
              style={styles.button}
              title='Szczegóły lekarza'
              onPress={() => {
                navigation.navigate('DoctorDataScreen', {
                  doctorMail: itemData.item.doctor.name,
                  doctorPhoneNumber: itemData.item.doctor.doctorPhoneNumber,
                  doctorId: itemData.item.doctor._id,
                  avatar: itemData.item.doctor.avatar,
                  specialization: itemData.item.doctor.specialization,
                  _id: _id,
                });
              }}
            />
          </View>
        )}
      />
    );
  }

  return <View style={styles.screen}>{display}</View>;
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    padding: 20,
  },
  button: {
    alignSelf: 'center',
    width: '60%',
  },
});
export default AppoinmentsScreen;
