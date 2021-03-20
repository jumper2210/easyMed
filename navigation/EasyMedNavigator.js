import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import ClinicScreen, {
  screenOptions as clinicScreenOptions,
} from '../screens/clinic/ClinicOverviewScreen';

import HomeScreen, {
  screenOptions as HomeScreenOptions,
} from '../screens/HomeScreen';

import NewClinicScreen, {
  screenOptions as AddClinicScreenOptions,
} from '../screens/clinic/NewClinicScreen';

import ClinicDetailScreen, {
  screenOptions as clinicDetailOptions,
} from '../screens/clinic/ClinicDetailScreen';

import MapScreen, {
  screenOptions as mapScreenOptions,
} from '../screens/clinic/MapScreen';
import AuthScreen, {
  screenOptions as AuthScreenOptions,
} from '../screens/AuthScreen';

import HealthInformationScreen, {
  screenOptions as HealthInformationScreenOptions,
} from '../screens/healthInformation/HealthInformationScreen';

import ChatGroupScreen, {
  screenOptions as ChatGroupsScreenOptions,
} from '../screens/chat/ChatGroupsScreen';

import ConversationScreen, {
  screenOptions as conversationScreenOptions,
} from '../screens/chat/ConversationScreen';

import UserAccountScreen, {
  screenOptions as UserAccountScreenOptions,
} from '../screens/user/UserAccountScreen';

import HealthInformationDetailsScreen, {
  screenOptions as HealthInformationDetailsScreenOptions,
} from '../screens/healthInformation/HealthInformationDetailsScreen';

import PatientDataScreen, {
  screenOptions as PatientDataScreenOptions,
} from '../screens/patient/PatientDataScreen';

import AllDoctorsScreen from '../screens/doctor/AllDoctorsScreen';

import DoctorDataScreen, {
  screenOptions as DoctorDataScreenOptions,
} from '../screens/doctor/DoctorDataScreen';

import AssignMedicineScreen, {
  screenOptions as AssignMedicineScreenOptions,
} from '../screens/medicine/AssignMedicineScreen';

import AssignClinicScreen from '../screens/clinic/AssignClinicScreen';

import AssignDoctorAccountScreen from '../screens/admin/AssignDoctorAccountScreen';
import UserDataScreen, {
  screenOptions as UserDataScreenOptions,
} from '../screens/user/UserDataScreen';

import EditUserDataScreen from '../screens/user/EditUserDataScreen';

import PatientHealthInformationsScreen from '../screens/patient/PatientHealthInformationsScreen';

import PatientMedicinesScreen from '../screens/patient/PatientMedicinesScreen';

import AllPatientsScreen from '../screens/patient/AllPatientsScreen';

import DoctorsAppointmentScreen from '../screens/doctorsAppointment/DoctorsAppointmentScreen';

import AvaibleHoursScreen from '../screens/doctorsAppointment/AvaibleHoursScreen';

import DoctorMedicalVisitsScreen from '../screens/doctor/DoctorMedicalVisitsScreen';

import PatientMedicalVisitsScreen from '../screens/patient/PatientMedicalVisitsScreen';

import EditMedicineScreen from '../screens/medicine/EditMedicineScreen';

import AddHealthNotesScreen from '../screens/healthInformation/AddHealthNotesScreen';

const defaultNavOptions = {
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Colors.secondary,
};
const defaultTabBarOptions = {
  activeTintColor: Colors.secondary,
  labelStyle: { fontFamily: 'open-sans' },
};

const UserManagementBottomTabs = createBottomTabNavigator();

export const UserManagementTabs = () => {
  const userRole = useSelector((state) => state.authState.role);

  return (
    <UserManagementBottomTabs.Navigator tabBarOptions={defaultTabBarOptions}>
      <UserManagementBottomTabs.Screen
        name='UserAccountScreen'
        component={UserAccountScreen}
        options={UserAccountScreenOptions}
      />
      {userRole == 'PATIENT' && (
        <UserManagementBottomTabs.Screen
          name='PatientHealthInformationScreen'
          component={PatientHealthInformationsScreen}
          options={{
            tabBarLabel: 'Historia twoich dolegliwości',
            title: 'Historia twoich dolegliwości',
            tabBarIcon: () => {
              return (
                <Ionicons name='md-list' size={30} color={Colors.secondary} />
              );
            },
          }}
        />
      )}
      {userRole == 'PATIENT' && (
        <UserManagementBottomTabs.Screen
          name='PatientMedicinesScreen'
          component={PatientMedicinesScreen}
          options={{
            tabBarLabel: 'Moje leki',
            title: 'Moje leki',
            tabBarIcon: () => {
              return (
                <Ionicons
                  name='md-medical'
                  size={30}
                  color={Colors.secondary}
                />
              );
            },
          }}
        />
      )}
    </UserManagementBottomTabs.Navigator>
  );
};

const EasyMedStackNavigator = createStackNavigator();

export const EasyMedNavigator = () => {
  return (
    <EasyMedStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <EasyMedStackNavigator.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={HomeScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name='ChatGroupsScreen'
        component={ChatGroupScreen}
        options={ChatGroupsScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name='ConversationScreen'
        component={ConversationScreen}
        options={{ headerTitle: '' }}
      />
      <EasyMedStackNavigator.Screen
        name='HealthInformationScreen'
        component={HealthInformationScreen}
        options={{ headerTitle: 'Opis twojej dolegliwości' }}
      />
      <EasyMedStackNavigator.Screen
        name='ClinicScreen'
        component={ClinicScreen}
        options={clinicScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name='AddClinicScreen'
        component={NewClinicScreen}
        options={AddClinicScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name='ClinicDetailsScreen'
        component={ClinicDetailScreen}
        options={clinicDetailOptions}
      />
      <EasyMedStackNavigator.Screen
        name='MapScreen'
        component={MapScreen}
        options={mapScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name='UserAccountScreen'
        component={UserManagementTabs}
        options={UserAccountScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name='EditUserDataScreen'
        component={EditUserDataScreen}
        options={{ headerTitle: 'Edytuj dane' }}
      />
      <EasyMedStackNavigator.Screen
        name='AllPatientsScreen'
        component={AllPatientsScreen}
        options={{ headerTitle: 'Pacjenci' }}
      />
      <EasyMedStackNavigator.Screen
        name='PatientDataScreen'
        component={PatientDataScreen}
        options={PatientDataScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name='HealthInformationDetailsScreen'
        component={HealthInformationDetailsScreen}
        options={HealthInformationDetailsScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name='AllDoctorsScreen'
        component={AllDoctorsScreen}
        options={{ headerTitle: 'Lekarze twojej przychodni' }}
      />
      <EasyMedStackNavigator.Screen
        name='DoctorDataScreen'
        component={DoctorDataScreen}
        options={DoctorDataScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name='AssignMedicineScreen'
        component={AssignMedicineScreen}
        options={AssignMedicineScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name='AssignClinicScreen'
        component={AssignClinicScreen}
        options={{ headerTitle: 'Zapisz się' }}
      />
      <EasyMedStackNavigator.Screen
        name='AssignDoctorAccountScreen'
        component={AssignDoctorAccountScreen}
        options={{ headerTitle: 'Stwórz konto' }}
      />
      <EasyMedStackNavigator.Screen
        name='UserDataScreen'
        component={UserDataScreen}
        options={UserDataScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name='DoctorsAppointmentScreen'
        component={DoctorsAppointmentScreen}
        options={{ headerTitle: 'Umów wizytę' }}
      />
      <EasyMedStackNavigator.Screen
        name='AvaibleHoursScreen'
        component={AvaibleHoursScreen}
        options={{ headerTitle: 'Dostępne godziny' }}
      />
      <EasyMedStackNavigator.Screen
        name='DoctorMedicalVisitsScreen'
        component={DoctorMedicalVisitsScreen}
        options={{ headerTitle: 'Porady lekarskie' }}
      />
      <EasyMedStackNavigator.Screen
        name='PatientMedicalVisitsScreen'
        component={PatientMedicalVisitsScreen}
        options={{ headerTitle: 'Wizyty lekarskie' }}
      />
      <EasyMedStackNavigator.Screen
        name='EditMedicineScreen'
        component={EditMedicineScreen}
        options={{ headerTitle: 'Edytuj' }}
      />
      <EasyMedStackNavigator.Screen
        name='AddHealthNotesScreen'
        component={EditMedicineScreen}
        options={{ headerTitle: 'Dodatkowe uwagi' }}
      />
    </EasyMedStackNavigator.Navigator>
  );
};
const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={AuthScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
