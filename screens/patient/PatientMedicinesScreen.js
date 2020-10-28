import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as medicineActions from "../../store/actions/medicine";
import MedicineItem from "../../components/UserComponents/MedicineItem";

const PatientMedicalCasesScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicinesState.medicines);
  let display = (
    <Text style={styles.info}>You don't have any assigned medicines</Text>
  );

  useEffect(() => {
    dispatch(medicineActions.loadPatientMedicines());
  }, [dispatch]);

  const infoHandler = (medicineId) => {
    console.log(medicineId + "__________");
    Alert.alert(
      "remove medical",
      `Are you sure you want to remove this medical?`,
      [
        {
          text: "remove medical",
          onPress: () => {
            dispatch(medicineActions.deleteMedicine(medicineId));
            navigation.navigate("HomeScreen");
          },
        },
        {
          text: "Cancel",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

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
            onDelete={() => infoHandler(itemData.item._id)}
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
