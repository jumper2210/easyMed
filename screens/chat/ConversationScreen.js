import React, { useEffect, useCallback, useState } from "react";

import { GiftedChat } from "react-native-gifted-chat";
import * as messageActions from "../../store/actions/chat";
import { useDispatch, useSelector } from "react-redux";

const ConversationScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authState.user);
  const groupId = props.route.params.groupId;
  const selectedGroupId = useSelector((state) =>
    state.chatState.chatGroups.find((group) => group._id === groupId)
  );

  const onSendHandler = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    dispatch(messageActions.createMessage(...messages, selectedGroupId));
  }, []);

  return (
    <GiftedChat
      user={user}
      messages={messages}
      onSend={(messages) => onSendHandler(messages)}
    />
  );
};

export default ConversationScreen;
