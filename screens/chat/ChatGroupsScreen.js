// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { View, Button, StyleSheet, ActivityIndicator } from "react-native";
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

  let display = <ActivityIndicator size="large" color={Colors.secondary} />;

  if (chatMates) {
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

  return (
    <View style={styles.container}>
      <Button
        title="add your chat mate"
        onPress={() => {
          navigation.navigate("AddChatMateScreen");
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
