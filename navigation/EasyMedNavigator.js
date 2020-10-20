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

import AddChatMateScreen from "../screens/chat/AddChatMateScreen";

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

import ChatGroupScreen from "../screens/chat/ChatGroupsScreen";

import ConversationScreen, {
  screenOptions as conversationScreenOptions,
} from "../screens/chat/ConversationScreen";

import PatientAccountScreen, {
  screenOptions as UserAccountScreenOptions,
} from "../screens/patient/PatientAccountScreen";

import EditPatientDataScreen from "../screens/patient/EditPatientDataScreen";

import PatientMedicalCasesScreen from "../screens/patient/PatientMedicalCasesScreen";

import PatientMedicinesScreen from "../screens/patient/PatientMedicinesScreen";

import AllPatientsScreen from "../screens/doctor/AllPatientsScreen";

import PatientDataScreen, {
  screenOptions as PatientDataScreenOptions,
} from "../screens/doctor/PatientDataScreen";

const defaultNavOptions = {
  headerTitleStyle: {
    fontFamily: "open-sans",
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
        name="UserAccount"
        component={PatientAccountScreen}
        options={UserAccountScreenOptions}
      />
      <UserManagementBottomTabs.Screen
        name="UserMedicalCasesScreen"
        component={PatientMedicalCasesScreen}
        options={{
          title: "Medical Cases",
          tabBarIcon: () => {
            return (
              <Ionicons name="md-list" size={23} color={Colors.secondary} />
            );
          },
        }}
      />
      <UserManagementBottomTabs.Screen
        name="PatientMedicinesScreen"
        component={PatientMedicinesScreen}
        options={{
          title: "Medicals",
          tabBarIcon: () => {
            return (
              <Ionicons name="md-medical" size={23} color={Colors.secondary} />
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
        name="Home"
        component={HomeScreen}
        options={HomeScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="ChatGroupsScreen"
        component={ChatGroupScreen}
      />
      <EasyMedStackNavigator.Screen
        name="ConversationScreen"
        component={ConversationScreen}
        options={conversationScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="AddChatMateScreen"
        component={AddChatMateScreen}
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
        name="PatientAccountScreen"
        component={UserManagementTabs}
        options={UserAccountScreenOptions}
      />
      <EasyMedStackNavigator.Screen
        name="EditPatientDataScreen"
        component={EditPatientDataScreen}
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
