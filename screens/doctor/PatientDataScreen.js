import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
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
  const {
    patientName,
    patientMail,
    patientPhoneNumber,
    patientId,
  } = route.params;

  let medicalCasesToCheck = [];
  let display = (
    <Text style={styles.patientInfo}>
      This paction has not any medical case yet.
    </Text>
  );

  useEffect(() => {
    dispatch(medicalCaseActions.loadPatientMedicalCase(patientId));
    dispatch(conversationActions.loadConversations());
    dispatch(chatMateActions.loadChatMates());
    dispatch(userAction.loadUserData());
  }, [dispatch]);

  const chatMates = useSelector((state) => state.chatMatesState.chatMates);
  const selfUser = useSelector((state) => state.usersState.selfUser);

  const medicalCases = useSelector(
    (state) => state.medicalCaseState.medicalCases
  );
  const conversations = useSelector(
    (state) => state.conversationsState.conversations
  );

  const setCurrentConversationId = (conversationId) => {
    dispatch(conversationActions.setCurrentConversation(conversationId));
  };

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

  const findConversationHandler = (patientId) => {
    const findConversation = conversations.find(
      (conversation) => conversation.chatMateId === patientId
    );
    return findConversation;
  };

  if (medicalCasesToCheck) {
    display = (
      <View>
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
      </View>
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
      <View style={styles.scrollViewStyled}>{display}</View>
      <Button
        title="Make a conversation"
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
});

export const screenOptions = (navData) => {
  return {
    title: navData.route.params.patientName,
  };
};

export default PatientDataScreen;
