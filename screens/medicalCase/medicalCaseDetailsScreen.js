import React from "react"
import { Image } from "react-native"
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native"
import { useDispatch } from "react-redux"
import Colors from "../../constants/Colors"
import * as medicalCaseActions from "../../store/actions/medicalCase"
import Button from "../../UI/Button"

const medicalCaseDetailsScreen = ({ route, navigation }) => {
  const {
    name,
    age,
    increase,
    locationOfPain,
    otherSymptom,
    pickedSymptom,
    radiance,
    scale,
    createdAt,
    imageUri,
    medicalCaseId,
    role,
  } = route.params
  const dispatch = useDispatch()

  const checkMedicalCaseHandler = (medicalCaseId) => {
    Alert.alert(
      "Checking Medical Case",
      "Are you sure, you want to check this medical case?",
      [
        {
          text: "Yes, check this!",
          onPress: () => {
            navigation.navigate("HomeScreen")
            dispatch(medicalCaseActions.checkMedicalCase(medicalCaseId))
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
  const editTextHandler = (data) => {
    if (data === undefined) {
      data = ""
    }
    const valueOfData = data.length
    let display = data

    if (valueOfData == 0) {
      display = <Text>no data</Text>
    }
    return display
  }

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>patient name:</Text>
          <Text style={styles.labelContent}>{editTextHandler(name)}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>age:</Text>
          <Text style={styles.labelContent}>{editTextHandler(age)}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>increase:</Text>
          <Text style={styles.labelContent}>{editTextHandler(increase)}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>location of pain:</Text>
          <Text style={styles.labelContent}>
            {editTextHandler(locationOfPain)}
          </Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>other symptom:</Text>
          <Text style={styles.labelContent}>
            {editTextHandler(otherSymptom)}
          </Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>pickedSymptom:</Text>
          <Text style={styles.labelContent}>
            {editTextHandler(pickedSymptom)}
          </Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>radiance:</Text>
          <Text style={styles.labelContent}>{editTextHandler(radiance)}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>scale:</Text>
          <Text style={styles.labelContent}>{editTextHandler(scale)}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>created at:</Text>
          <Text style={styles.labelContent}>{editTextHandler(createdAt)}</Text>
        </View>
        {imageUri !== undefined ? (
          <Image style={styles.image} source={{ uri: imageUri }} />
        ) : null}
      </ScrollView>
      {role === "DOCTOR" ? (
        <Button
          title="check this medical case"
          onPress={() => {
            checkMedicalCaseHandler(medicalCaseId)
          }}
        />
      ) : null}
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  scrollView: {
    backgroundColor: Colors.primary,
  },
  labelContainer: {
    padding: 20,
    flexDirection: "row",
    borderBottomWidth: 0.4,
    borderBottomColor: Colors.secondary,
  },
  labelTitle: {
    color: Colors.secondary,
    fontSize: 13,
    fontFamily: "open-sans-bold",
    textTransform: "uppercase",
  },
  labelContent: {
    color: Colors.details,
    fontSize: 13,
    fontFamily: "open-sans-bold",
    textTransform: "uppercase",
  },
  image: {
    height: 200,
    width: 200,
  },
})
export const screenOptions = (navData) => {
  return {
    title: "Details",
  }
}
export default medicalCaseDetailsScreen
