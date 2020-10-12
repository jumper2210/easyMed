const initialState = {
  currentConversationId: "",
  conversations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_CONVERSATIONS_SUCCESS": {
      return { ...state, conversations: action.conversations };
    }

    case "CREATE_CONVERSATION_SUCCESS": {
      return {
        conversations: [...state.conversations, action.conversation],
        currentConversationId: action.conversation.id,
      };
    }
    case "SET_CURRENT_CONVERSATION": {
      return { ...state, currentConversationId: action.conversationId };
    }
    default: {
      return state;
    }
  }
};
