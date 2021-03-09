import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import MedicalVisitItem from '../../components/MedicalVisitComponents/MedicalVisitItem';
import Colors from '../../constants/Colors';
import * as patientActions from '../../store/actions/patient';

const AppoinmentsScreen = (props) => {
  const { navigation } = props;
  const patientMedicalVisits = useSelector(
    (state) => state.patientsState.patientMedicalVisits
  );
  let display = <ActivityIndicator size='large' color={Colors.secondary} />;
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(patientActions.loadPatientMedicalVisits());
    });
    return unsubscribe;
  }, []);
  console.log(patientMedicalVisits);
  if (patientMedicalVisits) {
    display = (
      <FlatList
        contentContainerStyle={styles.list}
        data={patientMedicalVisits}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <View>
            <MedicalVisitItem
              date={itemData.item.medicalVisits.date}
              doctor={itemData.item.medicalVisits.doctor}
            />
            <Button
              title='Szczegóły lekarza'
              onPress={() => {
                navigation.navigate('DoctorDataScreen');
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
});
export default AppoinmentsScreen;
