import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

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
  return (
    <EasyMedDrawer.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
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
      <EasyMedDrawer.Screen
        name="Clinic"
        component={ClinicNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-business" : "ios-business"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </EasyMedDrawer.Navigator>
  );
};
