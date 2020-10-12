import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView, View } from "react-native";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
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

import ClinicDetail, {
  screenOptions as clinicDetailOptions,
} from "../screens/clinic/ClinicDetailScreen";

import MapScreen, {
  screenOptions as mapScreenOptions,
} from "../screens/clinic/MapScreen";
import AuthScreen, {
  screenOptions as AuthScreenOptions,
} from "../screens/user/AuthScreen";

import MedForm, {
  screenOptions as medFormScreenOptions,
} from "../screens/form/MedFormScreen";

import ChatGroupScreen, {
  screenOptions as chatGroupScreenOptions,
} from "../screens/chat/ChatGroupsScreen";

import ConversationScreen, {
  screenOptions as conversationScreenOptions,
} from "../screens/chat/ConversationScreen";
import { addDoctor } from "../store/actions/doctors";
import ChatGroupsScreen from "../screens/chat/ChatGroupsScreen";

const defaultNavOptions = {
  headerTitleStyle: {
    fontFamily: "open-sans",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Colors.details,
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
    <ChatStackNavigator.Navigator screenOptions={defaultNavOptions}>
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
      <ChatStackNavigator.Screen name="AddDoctor" component={AddDoctorScreen} />
    </ChatStackNavigator.Navigator>
  );
};

const CreateChatStackNavigator = createStackNavigator();

export const CreateChatNavigator = () => {
  return (
    <CreateChatStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <CreateChatStackNavigator.Screen
        name="Form"
        component={MedForm}
        options={medFormScreenOptions}
      />
    </CreateChatStackNavigator.Navigator>
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
                style={{
                  backgroundColor: Colors.secondary,
                }}
                textStyle={{ color: Colors.primary }}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.details,
      }}
    >
      <EasyMedDrawer.Screen name="Home" component={HomeNavigator} />
      <EasyMedDrawer.Screen name="ChatGroupsScreen" component={ChatNavigator} />
      <EasyMedDrawer.Screen name="FormScreen" component={CreateChatNavigator} />
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
