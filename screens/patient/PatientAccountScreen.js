import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors";
import constants from "../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/user";
import PatientAccountInfoItem from "../../components/PatientComponents/PatientAccountInfoItem";
import CustomButton from "../../UI/Button";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform } from "react-native";
import CustomHeaderButton from "../../UI/CustomHeaderButton";
import { Ionicons } from "@expo/vector-icons";

const PatientAccountScreen = () => {
  const dispatch = useDispatch();
  const selfUser = useSelector((state) => state.usersState.selfUser);

  useEffect(() => {
    dispatch(userActions.loadUserData());
  }, [dispatch]);
  console.log(selfUser);
  return (
    <View style={styles.screen}>
      <View style={styles.avatarContainer}>
        {selfUser.avatar && selfUser.avatar !== undefined ? (
          <Image style={styles.avatar} source={{ uri: selfUser.avatar }} />
        ) : (
          <CustomButton title="add your avatar by taking a picture" />
        )}
      </View>
      <View style={styles.infoContainer}>
        <PatientAccountInfoItem
          name={selfUser.name}
          email={selfUser.email}
          phoneNumber={selfUser.phoneNumber}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  avatarContainer: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    height: constants.screenHeight / 2 - 30,
    width: "100%",
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: constants.screenWidth - 60,
    height: 100,
    borderRadius: 10,
    borderColor: "transparent",
    borderWidth: 1,
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    height: constants.screenHeight / 2 - 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    title: "My account",
    tabBarIcon: () => {
      return <Ionicons name="md-build" size={23} color={Colors.secondary} />;
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="EditUser"
          iconName={Platform.OS === "android" ? "md-build" : "ios-build"}
          onPress={() => {
            navData.navigation.navigate("EditPatientDataScreen");
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default PatientAccountScreen;
