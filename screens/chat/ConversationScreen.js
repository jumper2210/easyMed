import React, { useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import * as messageActions from "../../store/actions/message";
import * as chatMatesActions from "../../store/actions/chatMate";

const ConversationScreen = (props) => {
  const dispatch = useDispatch();
  const { route } = props;
  const { conversation, chatMates, user } = route.params;
  const socket = io("http://192.168.1.17:8080");
  console.log(user.name + "z cs");
  console.log(chatMates[0].name + "z cs 2");
  const messages = useSelector(
    (state) =>
      state.messagesState[state.conversationsState.currentConversationId]
  );

  useEffect(() => {
    dispatch(chatMatesActions.loadChatMates());
    dispatch(messageActions.loadMessages(conversation.id));
    return () => {
      socket.emit("disconnect", {
        senderId: user._id,
      });
    };
  }, []);

  socket.emit("init", {
    senderId: user._id,
  });

  socket.on("message", (message) => {
    const newMessage = {
      createdAt: message.createdAt,
      text: message.text,
      userId: message.senderId,
      _id: message.msgId,
    };
    dispatch(messageActions.sendMessage(message.conversationId, newMessage));
  });

  const getConversationDoctor = (id) => {
    return id === user._id ? user.name : chatMates[0].name;
  };

  const getMappedMessages = () => {
    return messages
      ? messages
          .map(({ _id, text, createdAt, userId }) => {
            return {
              _id,
              text,
              createdAt,
              user: {
                _id: userId,
                name: getConversationDoctor(userId),
                avatar: "https://placeimg.com/140/140/any",
              },
            };
          })
          .reverse()
      : [];
  };

  const onSend = (message) => {
    socket.emit("message", {
      conversationId: conversation.id,
      text: message[0].text,
      senderId: user._id,
      receiverId: conversation.chatMateId,
      createdAt: new Date(),
      msgId: message[0]._id,
    });
    const newMessage = {
      createdAt: message[0].createdAt,
      text: message[0].text,
      userId: message[0].user._id,
      _id: message[0]._id,
    };
    dispatch(messageActions.sendMessage(conversation.id, newMessage));
  };
  return (
    <GiftedChat
      renderUsernameOnMessage
      messages={getMappedMessages()}
      onSend={onSend}
      user={{
        _id: user._id,
      }}
      isTyping
    />
  );
};
export default ConversationScreen;
