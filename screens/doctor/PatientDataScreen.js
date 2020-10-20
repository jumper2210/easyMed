import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MedicalCaseItem from "../../components/MedicalCase/MedicalCaseItem";
import Button from "../../UI/Button";
import Colors from "../../constants/Colors";
import * as conversationActions from "../../store/actions/conversation";
import * as chatMateActions from "../../store/actions/chatMate";
import * as medicalCaseActions from "../../store/actions/medicalCase";
import * as userAction from "../../store/actions/user";

const PatientDataScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    patientName,
    patientMail,
    patientPhoneNumber,
    patientId,
  } = route.params;

  const medicalCases = useSelector(
    (state) => state.medicalCaseState.medicalCases
  );
  const conversations = useSelector(
    (state) => state.conversationsState.conversations
  );
  const chatMates = useSelector((state) => state.chatMatesState.chatMates);

  const selfUser = useSelector((state) => state.usersState.selfUser);

  useEffect(() => {
    dispatch(medicalCaseActions.loadUserMedicalCase(patientId));
    dispatch(conversationActions.loadConversations());
    dispatch(chatMateActions.loadChatMates());
    dispatch(userAction.loadUserData());
  }, [dispatch]);

  const setCurrentConversationId = (conversationId) => {
    dispatch(conversationActions.setCurrentConversation(conversationId));
  };

  const findConversationHandler = (patientId) => {
    const findConversation = conversations.find(
      (conversation) => conversation.chatMateId === patientId
    );

    return findConversation;
  };

  let display = <ActivityIndicator size="large" color={Colors.secondary} />;

  if (medicalCases) {
    display = (
      <FlatList
        data={medicalCases}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => <MedicalCaseItem />}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.patientInfoContainer}>
        <Text>mail, name, phone</Text>
      </View>
      {display}
      <View style={styles.buttonContainer}>
        <Button title="check medical Case" />
      </View>
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
  },
  buttonContainer: {},
  patientInfoContainer: {},
  medicalCaseContainer: {},
});

export const screenOptions = (navData) => {
  return {
    title: navData.route.params.patientName,
  };
};

export default PatientDataScreen;
