import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";
import * as conversationActions from "../../store/actions/conversation";
import ChatMateItem from "../../components/ChatComponents/ChatMateItem";
import * as chatMateActions from "../../store/actions/chatMate";
import Colors from "../../constants/Colors";
import * as userActions from "../../store/actions/user";

const ChatGroupsScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const chatMates = useSelector((state) => state.chatMatesState.chatMates);
  const conversations = useSelector(
    (state) => state.conversationsState.conversations
  );
  const selfUser = useSelector((state) => state.usersState.selfUser);
  console.log(conversations);

  useEffect(() => {
    dispatch(chatMateActions.loadChatMates());
    dispatch(conversationActions.loadConversations());
    dispatch(userActions.loadUserData());
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

  if (conversations.length >= 1) {
    display = (
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ChatMateItem
            chatMateId={itemData.item.chatMateId}
            onSelect={() => {
              const conversation = findConversationHandler(
                itemData.item.chatMateId
              );
              navigation.navigate("ConversationScreen", {
                conversation: conversation,
                chatMates: chatMates,
                user: selfUser,
              });
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
