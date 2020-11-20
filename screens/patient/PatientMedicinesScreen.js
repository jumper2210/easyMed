import React, { useEffect } from "react"
import { View, Text, StyleSheet, FlatList, Alert } from "react-native"
import Colors from "../../constants/Colors"
import { useDispatch, useSelector } from "react-redux"
import * as medicineActions from "../../store/actions/medicine"
import MedicineControlItem from "../../components/MedicineComponents/MedicineControltem"
import * as Notifications from "expo-notifications"
import Button from "../../UI/Button"

const PatientMedicalCasesScreen = (props) => {
  const { _id } = useSelector((state) => state.usersState.selfUser)
  const { navigation } = props
  const dispatch = useDispatch()
  const medicines = useSelector((state) => state.medicinesState.medicines)
  let display = (
    <Text style={styles.info}>You don't have any assigned medicines</Text>
  )

  useEffect(() => {
    dispatch(medicineActions.loadPatientMedicines(_id))
  }, [dispatch])

  const triggerNotificationHandler = (medicineName) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicine reminder",
        body: `It's time to take ${medicineName}!`,
      },
      trigger: {
        seconds: 4,
      },
    })
  }

  const infoHandler = (medicineId, medicalName) => {
    Alert.alert(
      "remove medical",
      `Are you sure you want to remove ${medicalName}?`,
      [
        {
          text: "remove medical",
          onPress: () => {
            dispatch(medicineActions.deleteMedicine(medicineId))
            navigation.navigate("HomeScreen")
          },
        },
        {
          text: "Cancel",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    )
  }

  if (medicines || medicines.length >= 1) {
    display = (
      <FlatList
        data={medicines}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <MedicineControlItem
            name={itemData.item.name}
            quantity={itemData.item.quantity}
            timeOfTaking={itemData.item.timeOfTaking}
            onDelete={() => infoHandler(itemData.item._id, itemData.item.name)}
            onTriggerNotification={() =>
              triggerNotificationHandler(itemData.item.name)
            }
          />
        )}
      />
    )
  }

  return (
    <View style={styles.screen}>
      {display}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Button
          style={{ backgroundColor: Colors.secondary, width: "70%" }}
          textStyle={{ color: Colors.primary }}
          title="Assign your medicine"
          onPress={() => {
            navigation.navigate("AssignMedicineScreen", {
              patientId: _id,
            })
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  info: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: Colors.secondary,
  },
})

export default PatientMedicalCasesScreen
