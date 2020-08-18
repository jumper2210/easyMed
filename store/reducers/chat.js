import {
  CREATE_CHAT_GROUP,
  FETCH_CHAT_GROUPS,
  GET_MESSAGES,
  CREATE_MESSAGE,
} from "../actions/chat";

const initialState = {
  chatGroups: "",
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHAT_GROUP:
      return {
        chatGroups: action.chatGroup,
      };
    case FETCH_CHAT_GROUPS:
      return {
        chatGroups: action.chatGroups,
      };
    case CREATE_MESSAGE:
      return { messages: action.createMessage };
    case GET_MESSAGES:
      return { messages: action.getMessage };
    default:
      return state;
  }
};
