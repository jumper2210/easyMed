import React from "react"
import { View, StyleSheet } from "react-native"
import Colors from "../constants/Colors"

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 6,
    borderColor: Colors.primary,
    borderRadius: 20,
    justifyContent: "space-around",
    backgroundColor: Colors.primary,
  },
})

export default Card
