export const loadMessagesSuccess = ({ messages, id }) => ({
  type: "LOAD_MESSAGES_SUCCESS",
  id,
  messages,
})

export const loadMessagesFailure = () => ({
  type: "LOAD_MESSAGES_FAILURE",
})

export const loadMessages = (conversationId) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token
    fetch(`http://192.168.1.12:8080/message/getMessage/${conversationId}`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch messages")
        }
        return response.json()
      })
      .then((messages) => {
        if (!messages.error) {
          dispatch(loadMessagesSuccess(messages))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export const sendMessage = (conversationId, message) => ({
  type: "SEND_MESSAGE",
  conversationId,
  message,
})
