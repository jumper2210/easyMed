import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import MedicalVisitItem from '../../components/MedicalVisitComponents/MedicalVisitItem';
import Colors from '../../constants/Colors';
import * as doctorActions from '../../store/actions/doctor';
import Button from '../../UI/Button';

const DoctorMedicalVisitsScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const doctorMedicalVisits = useSelector(
    (state) => state.doctorsState.doctorMedicalVisits
  );
  let display = <ActivityIndicator size='large' color={Colors.secondary} />;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(doctorActions.loadDoctorMedicalVisits());
    });
    return unsubscribe;
  }, []);

  if (doctorMedicalVisits) {
    display = (
      <FlatList
        contentContainerStyle={styles.list}
        data={doctorMedicalVisits}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <View>
            <MedicalVisitItem
              date={itemData.item.medicalVisits.date}
              patient={itemData.item.medicalVisits.doctor}
            />
            <Button
              title='Szczegóły pacjenta'
              onPress={() => {
                navigation.navigate('PatientDataScreen', {});
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
export default DoctorMedicalVisitsScreen;
