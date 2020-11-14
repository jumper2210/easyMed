import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native"
import * as usersActions from "../../store/actions/user"
import Colors from "../../constants/Colors"
import UserDetailsItem from "../../components/UserComponents/UserDetailsItem"

const SetDoctorRoleScreen = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()
  const users = useSelector((state) => state.usersState.users)
  let display = <ActivityIndicator size="large" color={Colors.secondary} />

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(usersActions.loadAllUsers())
    })
    return unsubscribe
  }, [navigation])

  if (users) {
    display = (
      <FlatList
        data={users}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <UserDetailsItem
            avatar={itemData.item.avatar}
            name={itemData.item.name}
            onPress={() => {
              navigation.navigate("UserDataScreen", {
                userMail: itemData.item.email,
                userPhoneNumber: itemData.item.phoneNumber,
                userId: itemData.item._id,
                avatar: itemData.item.avatar,
                role: itemData.item.role,
                userName: itemData.item.name,
              })
            }}
          />
        )}
      />
    )
  }

  return <View style={styles.screen}>{display}</View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    padding: 20,
  },
})

export const screenOptions = () => {
  return {}
}
export default SetDoctorRoleScreen
