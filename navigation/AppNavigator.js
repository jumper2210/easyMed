import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { EasyMedNavigator } from "./EasyMedNavigator";

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <EasyMedNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
