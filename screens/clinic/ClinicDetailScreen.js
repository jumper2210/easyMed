import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { HeaderTitle } from "@react-navigation/stack";

const ClinicDetailScreen = props => {
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
};

export const screenOptions = navData => {
  return { headerTitle: navData.route.params.ClinicDetail };
};

const styles = StyleSheet.create({});
export default ClinicDetailScreen;
