import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import ClinicScreen, {
  screenOptions as clinicScreenOptions,
} from "../screens/clinic/ClinicOverviewScreen";

import HomeScreen, {
  screenOptions as HomeScreenOptions,
} from "../screens/HomeScreen";

import NewClinicScreen, {
  screenOptions as AddClinicScreenOptions,
} from "../screens/clinic/NewClinicScreen";

import ClinicDetailScreen, {
  screenOptions as clinicDetailOptions,
} from "../screens/clinic/ClinicDetailScreen";

import MapScreen, {
  screenOptions as mapScreenOptions,
} from "../screens/clinic/MapScreen";
import AuthScreen, {
  screenOptions as AuthScreenOptions,
} from "../screens/AuthScreen";

import MedFormScreen, {
  screenOptions as medFormScreenOptions,
} from "../screens/form/MedFormScreen";

import ChatGroupScreen, {
  screenOptions as ChatGroupsScreenOptions,
} from "../screens/chat/ChatGroupsScreen";

import ConversationScreen, {
  screenOptions as conversationScreenOptions,
} from "../screens/chat/ConversationScreen";

import UserAccountScreen, {
  screenOptions as UserAccountScreenOptions,
} from "../screens/user/UserAccountScreen";

import EditUserDataScreen from "../screens/user/EditUserDataScreen";

import PatientMedicalCasesScreen from "../screens/patient/PatientMedicalCasesScreen";

import PatientMedicinesScreen from "../screens/patient/PatientMedicinesScreen";

import AllPatientsScreen from "../screens/doctor/AllPatientsScreen";

import MedicalCaseDetailsScreen, {
  screenOptions as MedicalCaseDetailsScreenOptions,
} from "../screens/medicalCase/medicalCaseDetailsScreen";

import PatientDataScreen, {
  screenOptions as PatientDataScreenOptions,
} from "../screens/doctor/PatientDataScreen";

import AllDoctorsScreen from "../screens/patient/AllDoctorsScreen";

import DoctorDataScreen from "../screens/patient/DoctorDataScreen";

import AssignMedicineScreen, {
  screenOptions as AssignMedicineScreenOptions,
} from "../screens/medicine/AssignMedicineScreen";

const defaultNavOptions = {
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Colors.secondary,
};
const defaultTabBarOptions = {
  activeTintColor: Colors.secondary,
  labelStyle: { fontFamily: "open-sans" },
};

const UserManagementBottomTabs = createBottomTabNavigator();

export const UserManagementTabs = () => {
  return (
    <UserManagementBottomTabs.Navigator tabBarOptions={defaultTabBarOptions}>
      <UserManagementBottomTabs.Screen
        name="UserAccountScreen"
        component={UserAccountScreen}
        options={UserAccountScreenOptions}
      />
      <UserManagementBottomTabs.Screen
        name="UserMedicalCasesScreen"
        component={PatientMedicalCasesScreen}
        options={{
          title: "Medical History",
          tabBarIcon: () => {
            return (
              <Ionicons name="md-list" size={26} color={Colors.secondary} />
            );
          },
        }}
      />
      <UserManagementBottomTabs.Screen
        name="PatientMedicinesScreen"
        component={PatientMedicinesScreen}
        options={{
          title: "My Medicals",
          tabBarIcon: () => {
            return (
              <Ionicons name="md-medical" size={26} color={Colors.secondary} />
            );
          },
        }}
      />
    </UserManagementBottomTabs.Navigator>
  );
};

const EasyMedStackNavigator = createStackNavigator();

export const EasyMedNavigator = () => {
  return (
    <EasyMedStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <EasyMedStackNavigator.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={HomeScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="ChatGroupsScreen"
        component={ChatGroupScreen}
        options={ChatGroupsScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="ConversationScreen"
        component={ConversationScreen}
        options={conversationScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="FormScreen"
        component={MedFormScreen}
        options={medFormScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="ClinicScreen"
        component={ClinicScreen}
        options={clinicScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="AddClinicScreen"
        component={NewClinicScreen}
        options={AddClinicScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="ClinicDetailsScreen"
        component={ClinicDetailScreen}
        options={clinicDetailOptions}
      />
      <EasyMedStackNavigator.Screen
        name="MapScreen"
        component={MapScreen}
        options={mapScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="UserAccountScreen"
        component={UserManagementTabs}
        options={UserAccountScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="EditUserDataScreen"
        component={EditUserDataScreen}
      />
      <EasyMedStackNavigator.Screen
        name="AllPatientsScreen"
        component={AllPatientsScreen}
      />
      <EasyMedStackNavigator.Screen
        name="PatientDataScreen"
        component={PatientDataScreen}
        options={PatientDataScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="MedicalCaseDetailsScreen"
        component={MedicalCaseDetailsScreen}
        options={MedicalCaseDetailsScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="AllDoctorsScreen"
        component={AllDoctorsScreen}
      />
      <EasyMedStackNavigator.Screen
        name="DoctorDataScreen"
        component={DoctorDataScreen}
      />
      <EasyMedStackNavigator.Screen
        name="AssignMedicineScreen"
        component={AssignMedicineScreen}
        options={AssignMedicineScreenOptions}
      />
    </EasyMedStackNavigator.Navigator>
  );
};
const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={AuthScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
