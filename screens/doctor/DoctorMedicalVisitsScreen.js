import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import DoctorMedicalVisitItem from '../../components/MedicalVisitComponents/DoctorMedicalVisitItem';
import Colors from '../../constants/Colors';
import * as doctorActions from '../../store/actions/doctor';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../UI/CustomHeaderButton';

const DoctorMedicalVisitsScreen = ({ navigation, route }) => {
  const { _id } = route.params;
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
          <DoctorMedicalVisitItem
            date={itemData.item.date}
            hour={itemData.item.hour}
            medicalVisitId={itemData.item._id}
            patientName={itemData.item.patient.name}
            patientMail={itemData.item.patient.email}
            patientPhoneNumber={itemData.item.patient.phoneNumber}
            patientId={itemData.item.patient._id}
            avatar={itemData.item.patient.avatar}
            role={itemData.item.patient.role}
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
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title=''
          iconName={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          onPress={() => {
            navData.navigation.navigate('DoctorMedicalVisitHistoryScreen', {
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
export default DoctorMedicalVisitsScreen;
