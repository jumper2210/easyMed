// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { View, Button, StyleSheet, ActivityIndicator } from "react-native";
import * as conversationActions from "../../store/actions/conversation";
import DoctorItem from "../../components/ChatComponents/DoctorItem";
import * as doctorsActions from "../../store/actions/doctors";
import Colors from "../../constants/Colors";

const ChatGroupsScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const doctors = useSelector((state) => state.doctorsState.doctors);
  const conversations = useSelector(
    (state) => state.conversationsState.conversations
  );

  const setCurrentConversationId = (conversationId) => {
    dispatch(conversationActions.setCurrentConversation(conversationId));
  };

  useEffect(() => {
    dispatch(doctorsActions.loadDoctors());
    dispatch(conversationActions.loadConversations());
  }, [dispatch]);

  const findConversationHandler = (doctorId) => {
    const findConversation = conversations.find(
      (conversation) => conversation.doctorId === doctorId
    );
    return findConversation;
  };

  let display = <ActivityIndicator size="large" color={Colors.secondary} />;

  if (doctors) {
    display = (
      <FlatList
        data={doctors}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <DoctorItem
            name={itemData.item.name}
            onSelect={() => {
              const conversation = findConversationHandler(itemData.item._id);
              if (conversation && conversation.id) {
                setCurrentConversationId(conversation.id),
                  navigation.navigate("ConversationScreen", {
                    conversation: conversation,
                    doctors: doctors,
                  });
              } else {
                dispatch(
                  conversationActions.createConversation(
                    itemData.item._id,
                    navigation
                  )
                );
              }
            }}
          />
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="add doctor"
        onPress={() => {
          navigation.navigate("AddDoctorScreen");
        }}
      />
      {display}
    </View>
  );
};
export const screenOptions = (navData) => {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
});
export default ChatGroupsScreen;
