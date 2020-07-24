import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { EasyMedNavigator, AutNavigator } from "./EasyMedNavigator";

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <AutNavigator />
      {/* <EasyMedNavigator /> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
