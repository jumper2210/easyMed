import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import UserDetailsItem from "../../components/UserComponents/UserDetailsItem";
import * as usersActions from "../../store/actions/user";
import * as chatMateActions from "../../store/actions/chatMate";
import Colors from "../../constants/Colors";

const AllPatientsScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.usersState.users);
  const chatMates = useSelector((state) => state.chatMatesState.chatMates);

  let display = <ActivityIndicator size="large" color={Colors.secondary} />;

  useEffect(() => {
    dispatch(usersActions.loadAllUsers());
    dispatch(chatMateActions.loadChatMates());
  }, []);

  if (patients) {
    display = (
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.list}
        data={patients}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) =>
          itemData.item.role == "PATIENT" ? (
            <UserDetailsItem
              avatar={itemData.item.avatar}
              name={itemData.item.name}
              onPress={() => {
                dispatch(
                  chatMateActions.isMyChatMate(chatMates, itemData.item._id)
                );
                navigation.navigate("PatientDataScreen", {
                  chatMates: chatMates,
                  patientName: itemData.item.name,
                  patientMail: itemData.item.email,
                  patientId: itemData.item._id,
                  patientPhoneNumber: itemData.item.phoneNumber,
                  medicalCases: itemData.item.medicalCases,
                });
              }}
            />
          ) : null
        }
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
