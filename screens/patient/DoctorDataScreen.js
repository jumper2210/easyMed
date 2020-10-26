import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import Button from "../../UI/Button";
import * as conversationActions from "../../store/actions/conversation";
import * as chatMateActions from "../../store/actions/chatMate";
import * as userAction from "../../store/actions/user";

const DoctorDataScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const chatMates = useSelector((state) => state.chatMatesState.chatMates);
  const selfUser = useSelector((state) => state.usersState.selfUser);
  const conversations = useSelector(
    (state) => state.conversationsState.conversations
  );

  const setCurrentConversationId = (conversationId) => {
    dispatch(conversationActions.setCurrentConversation(conversationId));
  };
  const { doctorMail, doctorPhoneNumber, doctorId } = route.params;

  useEffect(() => {
    dispatch(conversationActions.loadConversations());
    dispatch(chatMateActions.loadChatMates());
    dispatch(userAction.loadUserData());
  }, [dispatch]);

  const findConversationHandler = (patientId) => {
    const findConversation = conversations.find(
      (conversation) => conversation.chatMateId === patientId
    );
    return findConversation;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.doctorInfoContainer}>
        <Text style={styles.label}>{doctorMail}</Text>
        <Text style={styles.label}>{doctorPhoneNumber}</Text>
      </View>

      <Button
        title="Make a conversation"
        onPress={() => {
          const conversation = findConversationHandler(doctorId);
          if (conversation && conversation.id) {
            setCurrentConversationId(conversation.id);
            navigation.navigate("ConversationScreen", {
              conversation: conversation,
              chatMates: chatMates,
              user: selfUser,
            });
          } else {
            dispatch(
              conversationActions.createConversation(doctorId, navigation)
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
  doctorInfoContainer: {
    marginVertical: 40,
  },
  label: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  doctorInfo: {
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
    title: navData.route.params.doctorName,
  };
};

export default DoctorDataScreen;
