import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const AvatarDisplayItem = (props) => {
  const { role, avatar, style, imgStyle } = props
  let avatarDisplay
  if (avatar && avatar.length > 0) {
    avatarDisplay = (
      <Image style={[styles.avatar, imgStyle]} source={{ uri: avatar }} />
    )
  } else if (avatar == undefined && role === 'PATIENT') {
    avatarDisplay = (
      <Image
        style={[styles.avatar, imgStyle]}
        source={require('../../assets/defaultAvatars/patient.png')}
      />
    )
  } else if ((avatar == undefined && role === 'DOCTOR') || 'ADMIN') {
    avatarDisplay = (
      <Image
        style={[styles.avatar, imgStyle]}
        source={require('../../assets/defaultAvatars/doctor_avatar.png')}
      />
    )
  }
  return <View style={[styles.avatarContainer, style]}>{avatarDisplay}</View>
}

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 130,
    width: 100,
    borderRadius: 20,
  },
})

export default AvatarDisplayItem
