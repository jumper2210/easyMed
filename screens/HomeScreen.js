import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../UI/CustomHeaderButton';
import NavigationItem from '../components/NavigationItem';
import { ScrollView } from 'react-native-gesture-handler';
import * as userActions from '../store/actions/user';
import * as authActions from '../store/actions/auth';
import * as doctorActions from '../store/actions/doctor';
import * as patientActions from '../store/actions/patient';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  let display = null;
  let currentClinicId = null;
  const { role, isAssignClinic, clinics, _id } = useSelector(
    (state) => state.usersState.selfUser
  );

  if (clinics) {
    currentClinicId = clinics[0];
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(userActions.loadUserData());
    });
    return unsubscribe;
  }, []);

  if (isAssignClinic === false && role === 'PATIENT') {
    display = (
      <View style={styles.screen}>
        <NavigationItem
          name={'Przychodnia'}
          iconName={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}
          onPress={() =>
            navigation.navigate('ClinicScreen', {
              isAssignClinic: isAssignClinic,
              _id: _id,
              role: role,
            })
          }
        />
      </View>
    );
  }
  if (isAssignClinic === true && role === 'PATIENT') {
    display = (
      <View style={styles.screen}>
        <NavigationItem
          name={'Przychodnia'}
          iconName={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}
          onPress={() => {
            navigation.navigate('ClinicScreen', {
              role: role,
              _id: _id,
              role: role,
              currentClinicId: currentClinicId,
              isAssignClinic: isAssignClinic,
            });
          }}
        />
        <NavigationItem
          name={'Moje konto'}
          iconName={Platform.OS === 'android' ? 'md-contact' : 'ios-contact'}
          onPress={() => {
            navigation.navigate('UserAccountScreen');
          }}
        />
        <NavigationItem
          name={'Lekarze twojej przychodni'}
          iconName={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          onPress={() => {
            navigation.navigate('AllDoctorsScreen', {
              _id: _id,
              currentClinicId: currentClinicId,
            });
            dispatch(doctorActions.loadClinicDoctors(currentClinicId, _id));
          }}
        />
        <NavigationItem
          name={'Konwersacje'}
          iconName={
            Platform.OS === 'android' ? 'md-chatboxes' : 'ios-chatboxes'
          }
          onPress={() => {
            navigation.navigate('ChatGroupsScreen');
          }}
        />
        <NavigationItem
          name={'Umówione wizyty'}
          iconName={Platform.OS === 'android' ? 'md-contacts' : 'ios-contacts'}
          onPress={() => {
            navigation.navigate('PatientMedicalVisitsScreen', { _id: _id });
          }}
        />
      </View>
    );
  }
  if (role === 'ADMIN') {
    display = (
      <View style={styles.screen}>
        <NavigationItem
          name={'Przychodnia'}
          iconName={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}
          onPress={() => {
            navigation.navigate('ClinicScreen', { role: role });
          }}
        />

        <NavigationItem
          name={'Moje konto'}
          iconName={Platform.OS === 'android' ? 'md-contact' : 'ios-contact'}
          onPress={() => {
            navigation.navigate('UserAccountScreen');
          }}
        />
        <NavigationItem
          name={'Dodaj lekarza'}
          iconName={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          onPress={() => {
            navigation.navigate('AssignDoctorAccountScreen');
          }}
        />
      </View>
    );
  }
  if (role === 'DOCTOR' && isAssignClinic === true) {
    display = (
      <View style={styles.screen}>
        <NavigationItem
          name={'Przychodnia'}
          iconName={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}
          onPress={() => {
            navigation.navigate('ClinicScreen', {
              role: role,
              _id: _id,
              isAssignClinic: isAssignClinic,
              currentClinicId: currentClinicId,
            });
          }}
        />
        <NavigationItem
          name={'Moje konto'}
          iconName={Platform.OS === 'android' ? 'md-contact' : 'ios-contact'}
          onPress={() => {
            navigation.navigate('UserAccountScreen');
          }}
        />
        <NavigationItem
          name={'Konwersacje'}
          iconName={
            Platform.OS === 'android' ? 'md-chatboxes' : 'ios-chatboxes'
          }
          onPress={() => {
            navigation.navigate('ChatGroupsScreen');
          }}
        />
        <NavigationItem
          name={'Wszyscy pacjenci'}
          iconName={Platform.OS === 'android' ? 'md-list-box' : 'ios-list-box'}
          onPress={() => {
            navigation.navigate('AllPatientsScreen', {
              _id: _id,
              currentClinicId: currentClinicId,
            });
            dispatch(patientActions.loadClinicPatients(currentClinicId, _id));
          }}
        />
        <NavigationItem
          name={'Umówione wizyty'}
          iconName={Platform.OS === 'android' ? 'md-contacts' : 'ios-contacts'}
          onPress={() => {
            navigation.navigate('DoctorMedicalVisitsScreen', { _id: _id });
          }}
        />
      </View>
    );
  }
  return <ScrollView>{display}</ScrollView>;
};
export const screenOptions = () => {
  const dispatch = useDispatch();
  return {
    headerTitle: 'Start',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title=''
          iconName={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
          onPress={() => {
            dispatch(authActions.logout());
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noAssignClinic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
