import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import MedicineItem from './MedicineItem';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import * as medicineActions from '../../store/actions/medicine';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

const ListOfMedicines = (props) => {
  const { patientId, navigation } = props;
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicinesState.medicines);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(medicineActions.loadPatientMedicines(patientId));
  }, []);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {medicines ? (
        <FlatList
          horizontal
          data={medicines}
          keyExtractor={(item) => item._id}
          renderItem={(itemData) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditMedicineScreen', {
                  medicineId: itemData.item._id,
                  timeOfTaking: itemData.item.timeOfTaking,
                  medicineName: itemData.item.name,
                });
              }}
              style={styles.item}
            >
              <Text
                style={{ color: Colors.details, fontFamily: 'open-sans-bold' }}
              >
                {itemData.item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    padding: 10,
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ListOfMedicines;
