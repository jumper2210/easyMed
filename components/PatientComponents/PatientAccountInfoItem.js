import React from "react";
import { Text } from "react-native";
import Card from "../../UI/Card";
const PatientAccountInfoItem = (props) => {
  const { name, email, phoneNumber } = props;
  return (
    <Card>
      <Text>{name}</Text>
      <Text>{email}</Text>
      <Text>{phoneNumber}</Text>
    </Card>
  );
};

export default PatientAccountInfoItem;
