export const CREATE_CHAT_GROUP = "CREATE_CHAT_GROUP";
export const FETCH_CHAT_GROUPS = "FETCH_CHAT_GROUPS";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const GET_MESSAGES = "GET_MESSAGES";
import openSocket from "socket.io-client";

export const createChatGroup = (name) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    const response = await fetch(
      "http://192.168.1.17:8080/chatGroup/createChatGroup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          groupName: name,
        }),
      }
    );
    if (!response.ok) {
      console.log("Something went wrong");
    }
    const chatGroup = await response.json();

    dispatch({ type: CREATE_CHAT_GROUP, chatGroup: chatGroup });
  };
};

export const loadGroupsChat = () => {
  return async (dispatch) => {
    const response = await fetch(
      "http://192.168.1.17:8080/chatGroup/fetchChatGroups"
    );
    const data = await response.json();

    dispatch({ type: FETCH_CHAT_GROUPS, chatGroups: data.chatGroups });
  };
};

export const createMessage = (messages, selectedGroupId) => {
  return async (dispatch, getState) => {
    const createdAt = messages.createdAt;
    const text = messages.text;
    const createdBy = getState().authState.name;
    const creator = selectedGroupId;

    const response = await fetch(
      "http://192.168.1.17:8080/message/createMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createdBy: createdBy,
          createdAt: createdAt,
          text: text,
          creator: creator,
        }),
      }
    );
    if (!response.ok) {
      console.log("Something went wrong");
    }

    const message = await response.json();
    dispatch({ type: CREATE_MESSAGE, message: message });

    const socket = openSocket("http://192.168.1.17:8080");

    socket.on("messages", (data) => {
      if (data.action === "create") {
        dispatch({ type: CREATE_MESSAGE, message: data.message });
      }
    });
  };
};

export const getMessages = () => {
  return async (dispatch) => {
    const response = await fetch("http://192.168.1.17:8080/message/getMessage");
    const data = await response.json();
    if (data) {
      dispatch({ type: GET_MESSAGES, messages: data.messages });
    }
  };
};
