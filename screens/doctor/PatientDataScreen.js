import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MedicalCaseItem from "../../components/MedicalCase/MedicalCaseItem";
import Colors from "../../constants/Colors";
import * as conversationActions from "../../store/actions/conversation";
import * as chatMateActions from "../../store/actions/chatMate";
import * as medicalCaseActions from "../../store/actions/medicalCase";
import * as userAction from "../../store/actions/user";
import MedicalCase from "../../models/medicalCase";
import Button from "../../UI/Button";

const PatientDataScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  let medicalCasesToCheck = [];
  let medicalCaseDisplay = (
    <Text style={styles.patientInfo}>
      This paction has not any medical case yet.
    </Text>
  );
  const {
    patientName,
    patientMail,
    patientPhoneNumber,
    patientId,
    chatMates,
  } = route.params;
  const selfUser = useSelector((state) => state.usersState.selfUser);

  const medicalCases = useSelector(
    (state) => state.medicalCaseState.medicalCases
  );
  const conversations = useSelector(
    (state) => state.conversationsState.conversations
  );
  const isChatMateExist = useSelector(
    (state) => state.chatMatesState.isChatMateExist
  );

  useEffect(() => {
    dispatch(medicalCaseActions.loadPatientMedicalCase(patientId));
    dispatch(conversationActions.loadConversations());
    dispatch(userAction.loadUserData());
    dispatch(chatMateActions.loadChatMates());
  }, []);

  const setCurrentConversationId = (conversationId) => {
    dispatch(conversationActions.setCurrentConversation(conversationId));
  };

  let buttonDisplay = (
    <Button
      title={"Add chat mate"}
      onPress={() => {
        dispatch(chatMateActions.addChatMate(patientMail));
        infoHandler();
      }}
    />
  );

  if (isChatMateExist) {
    if (isChatMateExist == true) {
      buttonDisplay = (
        <Button
          title="Write a message"
          onPress={() => {
            const conversation = findConversationHandler(patientId);
            if (conversation && conversation.id) {
              setCurrentConversationId(conversation.id);
              navigation.navigate("ConversationScreen", {
                conversation: conversation,
                chatMates: chatMates,
                user: selfUser,
              });
            } else {
              dispatch(
                conversationActions.createConversation(patientId, navigation)
              );
            }
          }}
        />
      );
    }
  }

  medicalCases.map((mc) => {
    if (mc.resolved === false) {
      medicalCasesToCheck.push(
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
          mc.imageUri,
          mc.resolved
        )
      );
      return medicalCasesToCheck;
    }
  });

  const infoHandler = () => {
    Alert.alert(
      "Talk with your chat mate",
      "Now you can write to your chat mate",
      [
        {
          text: "add this patient to your chat mates",
          onPress: () => {
            navigation.navigate("ChatGroupsScreen");
          },
        },
      ]
    );
  };

  const findConversationHandler = (patientId) => {
    const findConversation = conversations.find(
      (conversation) => conversation.chatMateId === patientId
    );
    return findConversation;
  };

  if (medicalCasesToCheck) {
    medicalCaseDisplay = (
      <FlatList
        data={medicalCasesToCheck}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <MedicalCaseItem
            createdAt={itemData.item.createdAt}
            onPress={() => {
              navigation.navigate("MedicalCaseDetailsScreen", {
                name: patientName,
                medicalCaseId: itemData.item._id,
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

  return (
    <View style={styles.screen}>
      <View style={styles.patientInfoContainer}>
        <Text style={styles.label}>{patientMail}</Text>
        <Text style={styles.label}>{patientPhoneNumber}</Text>
      </View>
      <View style={styles.medicalCaseInfoContainer}>
        <Text style={styles.medicalCaseInfo}>Medical cases</Text>
      </View>
      <View style={styles.scrollViewStyled}>{medicalCaseDisplay}</View>
      <View style={styles.buttonContainer}>
        {buttonDisplay}
        <Button
          title="Assign medicines"
          onPress={() => {
            navigation.navigate("AssignMedicineScreen", {
              patientId: patientId,
              patientName: patientName,
            });
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  scrollViewStyled: {
    height: 200,
  },
  patientInfoContainer: {
    marginVertical: 40,
  },
  label: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  patientInfo: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
    fontSize: 10,
    textTransform: "uppercase",
  },
  medicalCaseInfoContainer: {
    marginVertical: 20,
  },
  medicalCaseInfo: {
    fontFamily: "open-sans",
    fontSize: 15,
    color: Colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const screenOptions = (navData) => {
  return {
    title: navData.route.params.patientName,
  };
};

export default PatientDataScreen;
