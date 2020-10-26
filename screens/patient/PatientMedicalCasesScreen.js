import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import MedicalCase from "../../models/medicalCase";
import * as medicalCaseActions from "../../store/actions/medicalCase";
import MedicalCaseItem from "../../components/MedicalCase/MedicalCaseItem";

const PatientMedicalCasesScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  let medicalHistory = [];
  const medicalCases = useSelector(
    (state) => state.medicalCaseState.medicalCases
  );
  const userId = useSelector((state) => state.usersState.selfUser._id);

  useEffect(() => {
    dispatch(medicalCaseActions.loadPatientMedicalCase(userId));
  });

  medicalCases.map((mc) => {
    if (mc.resolved === true) {
      medicalHistory.push(
        new MedicalCase(
          mc._id.toString(),
          mc.name,
          mc.age,
          mc.increase,
          mc.locationOfPain,
          mc.otherSymptom,
          mc.pickedSymptom,
          mc.radiance,
          mc.scale,
          mc.createdAt,
          mc.imageUri
        )
      );
      return medicalHistory;
    }
  });
  let display = (
    <Text style={styles.info}>You have not any medical history yet.</Text>
  );

  if (medicalHistory.length >= 1) {
    display = (
      <FlatList
        data={medicalHistory}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <MedicalCaseItem
            createdAt={itemData.item.createdAt}
            onPress={() => {
              navigation.navigate("MedicalCaseDetailsScreen", {
                age: itemData.item.age,
                increase: itemData.item.increase,
                locationOfPain: itemData.item.locationOfPain,
                otherSymptom: itemData.item.otherSymptom,
                pickedSymptom: itemData.item.pickedSymptom,
                radiance: itemData.item.radiance,
                scale: itemData.item.scale,
                createdAt: itemData.item.createdAt,
                imageUri: itemData.item.imageUri,
              });
            }}
          />
        )}
      />
    );
  }
  return <View style={styles.screen}>{display}</View>;
};
export const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
  info: {
    fontFamily: "open-sans",
    fontSize: 20,
    color: Colors.secondary,
    textAlign: "center",
  },
});

export const screenOptions = () => {
  return {
    headerTitle: "Medical history",
  };
};

export default PatientMedicalCasesScreen;
