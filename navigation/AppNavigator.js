import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { EasyMedNavigator, AuthNavigator } from "./EasyMedNavigator";
import { useSelector } from "react-redux";
import StartupScreen from "../screens/StartUpScreen";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.authState.token);
  const didTryAutoLogin = useSelector(
    (state) => state.authState.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {isAuth && <EasyMedNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
