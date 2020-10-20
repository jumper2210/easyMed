import ChatMate from "../../models/chatMate";
import { ADD_CHAT_MATE, LOAD_CHAT_MATES } from "../actions/chatMate";

const initialState = {
  chatMates: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT_MATE: {
      return {
        chatMates: [
          {
            ...state.chatMates,
            ...action.chatMate,
          },
        ],
      };
    }
    case LOAD_CHAT_MATES: {
      return {
        chatMates: action.chatMates.map(
          (cm) => new ChatMate(cm._id.toString(), cm.name)
        ),
      };
    }
    default: {
      return state;
    }
  }
};
