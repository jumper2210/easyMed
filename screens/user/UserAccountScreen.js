import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors";
import constants from "../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/user";
import UserAccountInfoItem from "../../components/UserAccount/UserAccountInfoItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform } from "react-native";
import CustomHeaderButton from "../../UI/CustomHeaderButton";
import { Ionicons } from "@expo/vector-icons";

const UserAccountScreen = (props) => {
  const dispatch = useDispatch();
  const selfUser = useSelector((state) => state.usersState.selfUser);
  useEffect(() => {
    dispatch(userActions.loadUserData());
  }, [dispatch]);

  let avatar = (
    <Image
      style={styles.avatar}
      source={require("../../assets/defaultAvatars/patient.png")}
    />
  );

  if (selfUser.avatar !== undefined) {
    avatar = <Image style={styles.avatar} source={{ uri: selfUser.avatar }} />;
  }
  return (
    <View style={styles.screen}>
      <View style={styles.avatarSection}>{avatar}</View>
      <View style={styles.infoContainer}>
        <UserAccountInfoItem
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
  avatarSection: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    height: constants.screenHeight / 2 + 60,
    width: "100%",
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    borderRadius: 10,
    borderColor: "transparent",
    borderWidth: 1,
    height: constants.screenHeight / 2 - 150,
    width: 300,
    marginBottom: 60,
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    height: constants.screenHeight / 2 - 120,
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "My account",
    tabBarIcon: () => {
      return <Ionicons name="md-build" size={26} color={Colors.secondary} />;
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Edit account"
          iconName={Platform.OS === "android" ? "md-build" : "ios-build"}
          onPress={() => {
            navData.navigation.navigate("EditUserDataScreen");
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default UserAccountScreen;
