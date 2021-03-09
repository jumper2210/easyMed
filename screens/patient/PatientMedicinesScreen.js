import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as medicineActions from '../../store/actions/medicine';
import MedicineControlItem from '../../components/MedicineComponents/MedicineControltem';
import * as Notifications from 'expo-notifications';

const PatientMedicalCasesScreen = (props) => {
  const { _id } = useSelector((state) => state.usersState.selfUser);
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicinesState.medicines);
  let display = (
    <Text style={styles.info}>Nie posiadasz przypisanych leków.</Text>
  );

  useEffect(() => {
    dispatch(medicineActions.loadPatientMedicines(_id));
  }, [dispatch]);

  const triggerNotificationHandler = (medicineName) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Czas na zażycie leku!',
        body: `${medicineName}`,
      },
      trigger: {
        seconds: 4,
      },
    });
  };

  if (medicines.length >= 1) {
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
    );
  }

  return <View style={styles.screen}>{display}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  info: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    color: Colors.secondary,
  },
});

export default PatientMedicalCasesScreen;
