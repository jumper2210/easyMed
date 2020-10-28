import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as medicineActions from "../../store/actions/medicine";
import MedicineItem from "../../components/UserComponents/MedicineItem";

const PatientMedicalCasesScreen = (props) => {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicinesState.medicines);
  useEffect(() => {
    dispatch(medicineActions.loadPatientMedicines());
  }, [dispatch]);
  let display = (
    <Text style={styles.info}>You don't have any assigned medicines</Text>
  );

  if (medicines !== undefined || medicines.length >= 1) {
    display = (
      <FlatList
        data={medicines}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <MedicineItem
            name={itemData.item.name}
            quantity={itemData.item.quantity}
            timeOfTaking={itemData.item.timeOfTaking}
            onDelete={() => {}}
            onSetNotification={() => {}}
          />
        )}
      />
    );
  }

  return <View style={styles.screen}>{display}</View>;
};

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
});

export default PatientMedicalCasesScreen;
