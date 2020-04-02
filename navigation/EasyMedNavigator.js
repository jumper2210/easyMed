import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList
} from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import AddPlaceScreen, {
  screenOptions as addPlaceScreenOptions
} from "../screens/AddPlaceScreen";

import HomeScreen, {
  screenOptions as HomeScreenOptions
} from "../screens/HomeScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
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

export const AddPlaceNavigator = () => {
  return (
    <AddPlaceStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AddPlaceStackNavigator.Screen
        name="Office"
        component={AddPlaceScreen}
        options={addPlaceScreenOptions}
      />
    </AddPlaceStackNavigator.Navigator>
  );
};

const EasyMedDrawer = createDrawerNavigator();

export const EasyMedNavigator = () => {
  return (
    <EasyMedDrawer.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
    >
      <EasyMedDrawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "android" ? "md-home" : "ios-home"}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <EasyMedDrawer.Screen
        name="Office"
        component={AddPlaceNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "android" ? "md-add" : "ios-add"}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </EasyMedDrawer.Navigator>
  );
};
