import ChatMate from "../../models/chatMate"
import {
  ADD_CHAT_MATE,
  LOAD_CHAT_MATES,
  SET_EXIST,
  SET_NOT_EXIST,
} from "../actions/chatMate"

const initialState = {
  chatMates: [],
  isChatMateExist: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT_MATE: {
      return {
        ...state,
        chatMates: action.chatMate,
      }
    }
    case LOAD_CHAT_MATES: {
      return {
        ...state,
        chatMates: action.chatMates.map(
          (cm) => new ChatMate(cm._id.toString(), cm.name)
        ),
      }
    }
    case SET_EXIST: {
      return {
        ...state,
        isChatMateExist: true,
      }
    }
    case SET_NOT_EXIST: {
      return {
        ...state,
        isChatMateExist: false,
      }
    }
    default: {
      return state
    }
  }
}
