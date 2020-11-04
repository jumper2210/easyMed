import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import DoctorDetailsItem from "../../components/UserComponents/UserDetailsItem";
import * as usersActions from "../../store/actions/user";
import * as chatMateActions from "../../store/actions/chatMate";
import Colors from "../../constants/Colors";

const AllDoctorsScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const chatMates = useSelector((state) => state.chatMatesState.chatMates);

  useEffect(() => {
    dispatch(usersActions.loadAllUsers());
    dispatch(chatMateActions.loadChatMates());
  }, []);

  const doctors = useSelector((state) => state.usersState.users);
  let display = <ActivityIndicator size="large" color={Colors.secondary} />;

  if (doctors) {
    display = (
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.list}
        data={doctors}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) =>
          itemData.item.role === "DOCTOR" ? (
            <DoctorDetailsItem
              avatar={itemData.item.avatar}
              name={itemData.item.name}
              onPress={() => {
                dispatch(
                  chatMateActions.isMyChatMate(chatMates, itemData.item._id)
                );
                navigation.navigate("DoctorDataScreen", {
                  doctorName: itemData.item.name,
                  doctorMail: itemData.item.email,
                  doctorId: itemData.item._id,
                  doctorPhoneNumber: itemData.item.phoneNumber,
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
    paddingTop: 20,
  },
  list: {
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
  },
});
export default AllDoctorsScreen;
