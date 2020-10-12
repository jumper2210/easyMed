// export const CREATE_CHAT_GROUP = "CREATE_CHAT_GROUP";
// export const FETCH_CHAT_GROUPS = "FETCH_CHAT_GROUPS";
// export const CREATE_MESSAGE = "CREATE_MESSAGE";
// export const GET_MESSAGES = "GET_MESSAGES";

// export const createChatGroup = (name) => {
//   return async (dispatch, getState) => {
//     const token = getState().authState.token;
//     const response = await fetch(
//       "http://192.168.1.17:8080/chatGroup/createChatGroup",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token,
//         },
//         body: JSON.stringify({
//           groupName: name,
//         }),
//       }
//     );
//     if (!response.ok) {
//       console.log("Something went wrong");
//     }
//     const chatGroup = await response.json();

//     dispatch({ type: CREATE_CHAT_GROUP, chatGroup: chatGroup });
//   };
// };

// export const loadGroupsChat = () => {
//   return async (dispatch) => {
//     const response = await fetch(
//       "http://192.168.1.17:8080/chatGroup/fetchChatGroups"
//     );
//     const data = await response.json();

//     dispatch({ type: FETCH_CHAT_GROUPS, chatGroups: data.chatGroups });
//   };
// };
