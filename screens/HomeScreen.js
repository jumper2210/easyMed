import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../UI/CustomHeaderButton';
import NavigationItem from '../components/NavigationItem';
import { ScrollView } from 'react-native-gesture-handler';
import * as userActions from '../store/actions/user';
import * as authActions from '../store/actions/auth';
// import RegisterForPushNotifications from '../helpers/registerForPushNotifications'
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

  // useEffect(() => {
  //   if (role === 'DOCTOR') {
  //     RegisterForPushNotifications()
  //   }
  // }, [])

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
          name={'Formularz informacji medycznych'}
          iconName={
            Platform.OS === 'android'
              ? 'md-add-circle-outline'
              : 'ios-add-circle-outline'
          }
          onPress={() => {
            navigation.navigate('FormScreen');
          }}
        />
        <NavigationItem
          name={'Wszyscy doktorzy'}
          iconName={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          onPress={() => {
            navigation.navigate('AllDoctorsScreen', { _id: _id });
            dispatch(doctorActions.loadClinicDoctors(currentClinicId));
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
        {/* <NavigationItem
          name={'Umów wizytę'}
          iconName={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}
          onPress={() => {
            navigation.navigate('DoctorsAppointmentScreen', {
              _id: _id,
            });
          }}
        /> */}
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
            navigation.navigate('AllPatientsScreen');
            dispatch(patientActions.loadClinicPatients(currentClinicId));
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
