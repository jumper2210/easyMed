import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import DoctorDetailsItem from "../../components/UserComponents/UserDetailsItem";
import * as usersActions from "../../store/actions/user";
import Colors from "../../constants/Colors";

const AllDoctorsScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  // for now loadAllPatients(), later loadAllDoctors()
  useEffect(() => {
    dispatch(usersActions.loadAllPatients());
  }, []);

  // for now .patients, later .doctors
  const doctors = useSelector((state) => state.usersState.patients);
  let display = <ActivityIndicator size="large" color={Colors.secondary} />;
  if (doctors) {
    display = (
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.list}
        data={doctors}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <DoctorDetailsItem
            avatar={itemData.item.avatar}
            name={itemData.item.name}
            onPress={() => {
              navigation.navigate("DoctorDataScreen", {
                doctorName: itemData.item.name,
                doctorMail: itemData.item.email,
                doctorId: itemData.item._id,
                doctorPhoneNumber: itemData.item.phoneNumber,
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
export default AllDoctorsScreen;
