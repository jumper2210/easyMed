import React, { useEffect, useState } from "react"
import { StyleSheet, View, FlatList, Text } from "react-native"
import MedicineItem from "./MedicineItem"
import Modal from "react-native-modal"
import { useDispatch, useSelector } from "react-redux"
import * as medicineActions from "../../store/actions/medicine"
import { TouchableOpacity } from "react-native-gesture-handler"
import Colors from "../../constants/Colors"

const ListOfMedicines = (props) => {
  const { patientId } = props
  const dispatch = useDispatch()
  const medicines = useSelector((state) => state.medicinesState.medicines)
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  useEffect(() => {
    dispatch(medicineActions.loadPatientMedicines(patientId))
  }, [])

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {medicines ? (
        <FlatList
          horizontal
          data={medicines}
          keyExtractor={(item) => item._id}
          renderItem={(itemData) => (
            <TouchableOpacity onPress={toggleModal} style={styles.item}>
              <Text
                style={{ color: Colors.details, fontFamily: "open-sans-bold" }}
              >
                {itemData.item.name}
              </Text>
              <Modal
                backdropOpacity={0.4}
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <MedicineItem
                    name={itemData.item.name}
                    quantity={itemData.item.quantity}
                    timeOfTaking={itemData.item.timeOfTaking}
                  />
                </View>
              </Modal>
            </TouchableOpacity>
          )}
        />
      ) : null}
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
    backgroundColor: "white",
    marginHorizontal: 10,
    padding: 10,
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
})
export default ListOfMedicines
