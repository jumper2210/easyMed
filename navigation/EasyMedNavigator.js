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
import AddDoctorScreen from "../screens/chat/AddDoctorScreen";
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

import UserAccountScreen, {
  screenOptions as UserAccountScreenOptions,
} from "../screens/user/UserAccountScreen";

import UserMedicalCasesScreen from "../screens/user/UserMedicalCasesScreen";

import UserMedicinesScreen from "../screens/user/UserMedicinesScreen";

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
        component={UserAccountScreen}
        options={{
          title: "My account",
          tabBarIcon: () => {
            return (
              <Ionicons name="md-build" size={30} color={Colors.secondary} />
            );
          },
        }}
      />
      <UserManagementBottomTabs.Screen
        name="UserMedicalCasesScreen"
        component={UserMedicalCasesScreen}
        options={{
          title: "Medical Cases",
          tabBarIcon: () => {
            return (
              <Ionicons name="md-list" size={30} color={Colors.secondary} />
            );
          },
        }}
      />
      <UserManagementBottomTabs.Screen
        name="UserMedicinesScreen"
        component={UserMedicinesScreen}
        options={{
          title: "Medicals",
          tabBarIcon: () => {
            return (
              <Ionicons name="md-medical" size={30} color={Colors.secondary} />
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
        name="AddDoctorScreen"
        component={AddDoctorScreen}
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
        options={{ headerTitle: null }}
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
