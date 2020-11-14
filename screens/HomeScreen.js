import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { View, StyleSheet, Platform } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../UI/CustomHeaderButton"
import NavigationItem from "../components/NavigationItem"
import { ScrollView } from "react-native-gesture-handler"
import * as authActions from "../store/actions/auth"

const HomeScreen = ({ navigation }) => {
  const userRole = useSelector((state) => state.authState.role)

  return (
    <ScrollView>
      <View style={styles.screen}>
        <NavigationItem
          name={"Clinic"}
          iconName={Platform.OS === "android" ? "md-medical" : "ios-medical"}
          onPress={() => {
            navigation.navigate("ClinicScreen", { userRole: userRole })
          }}
        />
        <NavigationItem
          name={"Chat room"}
          iconName={
            Platform.OS === "android" ? "md-chatboxes" : "ios-chatboxes"
          }
          onPress={() => {
            navigation.navigate("ChatGroupsScreen")
          }}
        />
        <NavigationItem
          name={"My account"}
          iconName={Platform.OS === "android" ? "md-contact" : "ios-contact"}
          onPress={() => {
            navigation.navigate("UserAccountScreen")
          }}
        />
        {userRole === "PATIENT" ? (
          <View>
            <NavigationItem
              name={"Medical Form"}
              iconName={
                Platform.OS === "android"
                  ? "md-add-circle-outline"
                  : "ios-add-circle-outline"
              }
              onPress={() => {
                navigation.navigate("FormScreen")
              }}
            />
            <NavigationItem
              name={"All doctors"}
              iconName={Platform.OS === "android" ? "md-list" : "ios-list"}
              onPress={() => {
                navigation.navigate("AllDoctorsScreen")
              }}
            />
          </View>
        ) : null}
        {userRole === "DOCTOR" ? (
          <NavigationItem
            name={"All patients"}
            iconName={
              Platform.OS === "android" ? "md-list-box" : "ios-list-box"
            }
            onPress={() => {
              navigation.navigate("AllPatientsScreen")
            }}
          />
        ) : null}

        {userRole === "ADMIN" ? (
          <NavigationItem
            name={"All users"}
            iconName={Platform.OS === "android" ? "md-list" : "ios-list"}
            onPress={() => {
              navigation.navigate("SetDoctorRoleScreen")
            }}
          />
        ) : null}
      </View>
    </ScrollView>
  )
}
export const screenOptions = () => {
  const dispatch = useDispatch()
  return {
    headerTitle: "Home",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title=""
          iconName={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
          onPress={() => {
            dispatch(authActions.logout())
          }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  screen: {
    padding: 1,
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
})

export default HomeScreen
