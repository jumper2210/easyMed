import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import Colors from "../../constants/Colors"
import constants from "../../constants/Constants"
import { useDispatch, useSelector } from "react-redux"
import * as userActions from "../../store/actions/user"
import UserAccountInfoItem from "../../components/UserComponents/UserAccountInfoItem"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { Platform } from "react-native"
import CustomHeaderButton from "../../UI/CustomHeaderButton"
import { Ionicons } from "@expo/vector-icons"
import UserAvatarItem from "../../components/UserComponents/UserAvatarItem"

const UserAccountScreen = (props) => {
  const dispatch = useDispatch()
  const selfUser = useSelector((state) => state.usersState.selfUser)
  const { avatar, name, email, phoneNumber, role } = selfUser

  useEffect(() => {
    dispatch(userActions.loadUserData())
  }, [])

  return (
    <View style={styles.screen}>
      <View style={styles.avatarSection}>
        <UserAvatarItem
          role={role}
          avatar={avatar}
          style={{
            borderRadius: 10,
            height: constants.screenHeight / 2 - 100,
            width: 300,
            marginBottom: 60,
          }}
          imgStyle={{
            height: "100%",
            width: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <UserAccountInfoItem
          name={name}
          email={email}
          phoneNumber={phoneNumber}
        />
      </View>
    </View>
  )
}
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
})

export const screenOptions = (navData) => {
  return {
    tabBarLabel: "Szczegóły",
    headerTitle: "Moje konto",
    tabBarIcon: () => {
      return <Ionicons name="md-build" size={26} color={Colors.secondary} />
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Edit account"
          iconName={Platform.OS === "android" ? "md-build" : "ios-build"}
          onPress={() => {
            navData.navigation.navigate("EditUserDataScreen")
          }}
        />
      </HeaderButtons>
    ),
  }
}
export default UserAccountScreen
