import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import PatientMedicalVisitItem from '../../components/MedicalVisitComponents/PatientMedicalVisitItem';
import Colors from '../../constants/Colors';
import * as patientActions from '../../store/actions/patient';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../UI/CustomHeaderButton';

const PatientMedicalVisitsScreen = ({ navigation, route }) => {
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
          <PatientMedicalVisitItem
            date={itemData.item.date}
            hour={itemData.item.hour}
            medicalVisitId={itemData.item._id}
            doctorName={itemData.item.doctor.name}
            doctorMail={itemData.item.doctor.mail}
            doctorPhoneNumber={itemData.item.doctor.phoneNumber}
            doctorId={itemData.item.doctor._id}
            avatar={itemData.item.doctor.avatar}
            specialization={itemData.item.doctor.specialization}
            role={itemData.item.doctor.role}
            _id={_id}
            navigation={navigation}
          />
        )}
      />
    );
  }

  return <View style={styles.screen}>{display}</View>;
};
export const screenOptions = (navData) => {
  const { _id } = navData.route.params;
  return {
    headerTitle: 'Twoje wizyty',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title=''
          iconName={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          onPress={() => {
            navData.navigation.navigate('PatientMedicalVisitHistoryScreen', {
              _id: _id,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
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
export default PatientMedicalVisitsScreen;
