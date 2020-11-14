import React from "react"
import { Image, StyleSheet, View } from "react-native"
import Colors from "../../constants/Colors"

const AvatarDisplayItem = (props) => {
  const { role, avatar, style, imgStyle } = props
  let avatarDisplay
  if (avatar !== "") {
    avatarDisplay = (
      <Image style={[styles.avatar, imgStyle]} source={{ uri: avatar }} />
    )
  } else if (avatar === "" && role === "PATIENT") {
    avatarDisplay = (
      <Image
        style={[styles.avatar, imgStyle]}
        source={require("../../assets/defaultAvatars/patient.png")}
      />
    )
  } else if (avatar === "" && role === "DOCTOR") {
    avatarDisplay = (
      <Image
        style={[styles.avatar, imgStyle]}
        source={require("../../assets/defaultAvatars/doctor_avatar.png")}
      />
    )
  }
  return <View style={[styles.avatarContainer, style]}>{avatarDisplay}</View>
}

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
  },
})

export default AvatarDisplayItem
