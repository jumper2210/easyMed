import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import messagesReducer from "./store/reducers/message";
import conversationsReducer from "./store/reducers/conversation";
import chatMatesReducer from "./store/reducers/chatMate";
import clinicReducer from "./store/reducers/clinics";
import medicalCaseReducer from "./store/reducers/medicalCase";
import usersReducer from "./store/reducers/user";
import medicinesReducer from "./store/reducers/medicine";

const rootReducer = combineReducers({
  clinicsState: clinicReducer,
  authState: authReducer,
  medicalCaseState: medicalCaseReducer,
  messagesState: messagesReducer,
  conversationsState: conversationsReducer,
  chatMatesState: chatMatesReducer,
  usersState: usersReducer,
  medicinesState: medicinesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

// store.subscribe(() => {
//   console.log("new state", store.getState());
// });
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
