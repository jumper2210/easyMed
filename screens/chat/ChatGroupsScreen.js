// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";
import * as conversationActions from "../../store/actions/conversation";
import ChatMateItem from "../../components/ChatComponents/ChatMateItem";
import * as chatMateActions from "../../store/actions/chatMate";
import Colors from "../../constants/Colors";

const ChatGroupsScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const chatMates = useSelector((state) => state.chatMatesState.chatMates);
  const conversations = useSelector(
    (state) => state.conversationsState.conversations
  );

  const setCurrentConversationId = (conversationId) => {
    dispatch(conversationActions.setCurrentConversation(conversationId));
  };

  useEffect(() => {
    dispatch(chatMateActions.loadChatMates());
    dispatch(conversationActions.loadConversations());
  }, [dispatch]);

  const findConversationHandler = (chatMateId) => {
    const findConversation = conversations.find(
      (conversation) => conversation.chatMateId === chatMateId
    );
    return findConversation;
  };

  let display = (
    <Text style={styles.info}>You don't have conversation yet.</Text>
  );

  if (chatMates.length >= 1) {
    display = (
      <FlatList
        data={chatMates}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <ChatMateItem
            name={itemData.item.name}
            onSelect={() => {
              const conversation = findConversationHandler(itemData.item._id);
              if (conversation && conversation.id) {
                setCurrentConversationId(conversation.id),
                  navigation.navigate("ConversationScreen", {
                    conversation: conversation,
                    chatMates: chatMates,
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

  return <View style={styles.container}>{display}</View>;
};
export const screenOptions = (navData) => {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  info: {
    color: Colors.details,
    fontSize: 15,
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
});
export default ChatGroupsScreen;
