import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Colors from "../../constants/Colors"
import constants from "../../constants/Constants"
import Button from "../../UI/Button"

const MedicineControlItem = (props) => {
  const {
    name,
    quantity,
    timeOfTaking,
    onDelete,
    onTriggerNotification,
  } = props

  return (
    <View style={styles.item}>
      <View style={styles.touchable}>
        <View style={styles.data}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View>
            <View style={styles.details}>
              <Text style={styles.description}>quantity:</Text>
              <Text style={styles.quantity}>{quantity}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.description}>time of taking:</Text>
              <Text style={styles.timeOfTaking}>{timeOfTaking}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={{ backgroundColor: Colors.primary }}
          textStyle={{ color: Colors.details }}
          onPress={onDelete}
          title="Drop medicine"
        />
        <Button
          style={{ backgroundColor: Colors.primary }}
          textStyle={{ color: Colors.details }}
          onPress={onTriggerNotification}
          title="Set notification"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    margin: 30,
    height: constants.screenHeight / 2 - 65,
    justifyContent: "space-between",
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  data: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 25,
    marginVertical: 10,
    color: Colors.details,
    textTransform: "uppercase",
  },
  timeOfTaking: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
    color: Colors.secondary,
  },
  quantity: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
    color: Colors.secondary,
  },
  description: {
    fontSize: 19,
    color: Colors.secondary,
    fontFamily: "open-sans",
  },
})

export default MedicineControlItem
