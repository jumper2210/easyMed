import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import PatientDetailsItem from "../../components/PatientComponents/PatientDetailsItem";
import * as usersActions from "../../store/actions/user";
import Colors from "../../constants/Colors";

const AllPatientsScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersActions.loadAllPatients());
  }, [dispatch]);
  const patients = useSelector((state) => state.usersState.patients);
  let display = <ActivityIndicator size="large" color={Colors.secondary} />;

  if (patients) {
    display = (
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.list}
        data={patients}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <PatientDetailsItem
            avatar={itemData.item.avatar}
            name={itemData.item.name}
            onPress={() => {
              navigation.navigate("PatientDataScreen", {
                patientName: itemData.item.name,
                patientMail: itemData.item.email,
                patientId: itemData.item._id,
                patientPhoneNumber: itemData.item.phoneNumber,
                medicalCases: itemData.item.medicalCases,
              });
            }}
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
  },
  list: {
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
  },
});
export default AllPatientsScreen;
