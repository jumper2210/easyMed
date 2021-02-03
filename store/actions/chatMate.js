export const LOAD_CHAT_MATES = "LOAD_DOCTORS"
export const ADD_CHAT_MATE = "ADD_CHAT_MATE"
export const SET_EXIST = "SET_EXIST"
export const SET_NOT_EXIST = "SET_NOT_EXIST"

export const loadChatMates = () => {
  return async (dispatch, getState) => {
    const token = getState().authState.token
    fetch("http://192.168.1.12:8080/chatMates/getChatMates", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch your chat mates")
        }
        return res.json()
      })
      .then((resData) => {
        dispatch({ type: LOAD_CHAT_MATES, chatMates: resData.chatMates })
      })
  }
}

export const addChatMate = (chatMateEmail) => {
  return async (dispatch, getState) => {
    const ownEmail = getState().usersState.selfUser.email
    const token = getState().authState.token
    fetch("http://192.168.1.12:8080/chatMates/addChatMate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ chatMateEmail, ownEmail }),
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("Failed to add chat mate")
        }
        return res.json()
      })
      .then((response) => {
        dispatch({ type: ADD_CHAT_MATE, chatMate: response.chatMate })
      })
  }
}

export const isMyChatMate = (chatMates, candidateChatMateId) => {
  return async (dispatch, getState) => {
    const exist = !!getState().chatMatesState.isChatMateExist
    chatMates.map((cm) => {
      if (cm._id == candidateChatMateId) {
        dispatch({
          type: SET_EXIST,
        })
      }
    })
    if (exist === true) {
      dispatch({ type: SET_NOT_EXIST })
    }
  }
}
