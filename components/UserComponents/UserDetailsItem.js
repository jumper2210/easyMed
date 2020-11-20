import React from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { StyleSheet, View, Text } from "react-native"
import Colors from "../../constants/Colors"
import constants from "../../constants/Constants"
import UserAvatarItem from "./UserAvatarItem"

const UserDetailsItem = (props) => {
  const { avatar, name, onPress, role } = props

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <UserAvatarItem role={role} avatar={avatar} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  item: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    height: 140,
    width: constants.screenWidth - 40,
    backgroundColor: Colors.primary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    borderColor: Colors.primary,
    borderRadius: 20,
    justifyContent: "space-around",
  },
  nameContainer: {
    justifyContent: "center",
    paddingBottom: 30,
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
    textTransform: "uppercase",
    color: Colors.details,
  },
})
export default UserDetailsItem
