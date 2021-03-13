import { currentIp } from '../../helpers/currentIp';

export const createConversationSuccess = (conversation) => ({
  type: 'CREATE_CONVERSATION_SUCCESS',
  conversation,
});

export const loadConversations = () => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    fetch(`${currentIp}/conversation/getConversationsWithDoctors`, {
      method: 'GET',
      headers: {
        Authorization: 'Barer ' + token,
      },
    })
      .then((response) => response.json())
      .then((conversations) => {
        if (!conversations.error) {
          dispatch(loadConversationsSuccess(conversations));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const createConversation = (chatMateId, navigation, selfUser) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    fetch(`${currentIp}/conversation/createConversationWithDoctor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ chatMateId: chatMateId }),
    })
      .then((response) => response.json())
      .then((conversation) => {
        if (!conversation.error) {
          dispatch(createConversationSuccess(conversation));
          navigation.navigate('ConversationScreen', {
            conversation: conversation,
            user: selfUser,
          });
        }
      });
  };
};

export const createConversationPatient = (chatMateId, navigation, selfUser) => {
  console.log(chatMateId, selfUser, 'z ccp');
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    fetch(`${currentIp}/conversation/createConversationWithPatient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ chatMateId: chatMateId }),
    })
      .then((response) => response.json())
      .then((conversation) => {
        if (!conversation.error) {
          dispatch(createConversationSuccess(conversation));
          navigation.navigate('ConversationScreen', {
            conversation: conversation,
            user: selfUser,
          });
        }
      });
  };
};

export const loadConversationsPatients = () => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    fetch(`${currentIp}/conversation/getConversationsWithPatients`, {
      method: 'GET',
      headers: {
        Authorization: 'Barer ' + token,
      },
    })
      .then((response) => response.json())
      .then((conversations) => {
        if (!conversations.error) {
          dispatch(loadConversationsSuccess(conversations));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const loadConversationsSuccess = (conversations) => ({
  type: 'LOAD_CONVERSATIONS_SUCCESS',
  conversations,
});

export const setCurrentConversation = (conversationId) => ({
  type: 'SET_CURRENT_CONVERSATION',
  conversationId,
});
