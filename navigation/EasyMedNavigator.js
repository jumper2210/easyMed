import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, SafeAreaView, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";
import { useDispatch } from "react-redux";

import ClinicScreen, {
  screenOptions as clinicScreenOptions,
} from "../screens/clinic/ClinicOverviewScreen";

import HomeScreen, {
  screenOptions as HomeScreenOptions,
} from "../screens/HomeScreen";

import NewClinicScreen, {
  screenOptions as AddClinicScreenOptions,
} from "../screens/clinic/NewClinicScreen";

import ClinicDetail, {
  screenOptions as clinicDetailOptions,
} from "../screens/clinic/ClinicDetailScreen";

import MapScreen, {
  screenOptions as mapScreenOptions,
} from "../screens/clinic/MapScreen";
import AuthScreen, {
  screenOptions as AuthScreenOptions,
} from "../screens/User/AuthScreen";

import MedForm, {
  screenOptions as medFormScreenOptions,
} from "../screens/chat/MedFormScreen";

import MedFormDetails, {
  screenOptions as medFormDetailsScreenOptions,
} from "../screens/chat/MedFormDetailsScreen";

import ChatGroupScreen, {
  screenOptions as chatGroupScreenOptions,
} from "../screens/chat/ChatGroupsScreen";

import ConversationScreen, {
  screenOptions as conversationScreenOptions,
} from "../screens/chat/ConversationScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const HomeStackNavigator = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <HomeStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={HomeScreenOptions}
      />
    </HomeStackNavigator.Navigator>
  );
};

const ChatStackNavigator = createStackNavigator();

export const ChatNavigator = () => {
  return (
    <ChatStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <ChatStackNavigator.Screen
        name="Form"
        component={MedForm}
        options={medFormScreenOptions}
      />
      <ChatStackNavigator.Screen
        name="FormDetails"
        component={MedFormDetails}
        options={medFormDetailsScreenOptions}
      />
      <ChatStackNavigator.Screen
        name="ChatGroups"
        component={ChatGroupScreen}
        options={chatGroupScreenOptions}
      />
      <ChatStackNavigator.Screen
        name="Conversation"
        component={ConversationScreen}
        options={conversationScreenOptions}
      />
    </ChatStackNavigator.Navigator>
  );
};

const AddPlaceStackNavigator = createStackNavigator();

export const ClinicNavigator = () => {
  return (
    <AddPlaceStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AddPlaceStackNavigator.Screen
        name="Clinic"
        component={ClinicScreen}
        options={clinicScreenOptions}
      />
      <AddPlaceStackNavigator.Screen
        name="AddClinic"
        component={NewClinicScreen}
        options={AddClinicScreenOptions}
      />
      <AddPlaceStackNavigator.Screen
        name="ClinicDetail"
        component={ClinicDetail}
        options={clinicDetailOptions}
      />
      <AddPlaceStackNavigator.Screen
        name="MapScreen"
        component={MapScreen}
        options={mapScreenOptions}
      />
    </AddPlaceStackNavigator.Navigator>
  );
};

const EasyMedDrawer = createDrawerNavigator();

export const EasyMedNavigator = () => {
  const dispatch = useDispatch();
  return (
    <EasyMedDrawer.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <EasyMedDrawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-home" : "ios-home"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <EasyMedDrawer.Screen name="CreateChat" component={ChatNavigator} />
      <EasyMedDrawer.Screen name="ClinicScreen" component={ClinicNavigator} />
    </EasyMedDrawer.Navigator>
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
