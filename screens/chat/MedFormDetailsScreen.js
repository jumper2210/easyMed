import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  Button,
} from "react-native";
import Input from "../../UI/Input";
import Card from "../../UI/Card";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import ImgPicker from "../../components/AddClinicComponents/ImgPicker";

const MedFormDetailsScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState();

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };
  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={50}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.gradient}
      >
        <View style={styles.textContainer}>
          <Text style={styles.mainInfo}>
            Please fill in information about specific's
          </Text>
        </View>
        <Card style={styles.formContainer}>
          <ScrollView>
            <Input
              id="escalation"
              label="escalation of pain. *if relevant"
              keyboardType="default"
              autoCapitalize="none"
              errorMessage="Enter any specific's. *If relevant."
              onInputChange={() => {}}
              initialValue=""
              editable
              maxLength={20}
            />
            <Input
              id="location"
              label="location of pain. *if relevant"
              keyboardType="default"
              autoCapitalize="none"
              errorMessage="determine where you feel pain. *If relevant."
              onInputChange={() => {}}
              initialValue=""
              editable
              maxLength={20}
            />
            <Input
              id="radiance"
              label="Pain radiation. *If relevant"
              keyboardType="default"
              autoCapitalize="none"
              errorMessage="determine of pain radiation. *if relevant."
              onInputChange={() => {}}
              initialValue=""
              editable
              maxLength={40}
            />
            <ImgPicker onImageTaken={imageTakenHandler} />

            <View style={styles.buttonsContainer}>
              <View style={styles.button}>
                <Button title="Create Group" onPress={() => {}} />
              </View>
              <Button
                title="Back"
                onPress={() => {
                  navigation.navigate("Form");
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  button: {
    marginRight: 10,
  },
  formContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 580,
    padding: 13,
  },
  textContainer: {
    justifyContent: "center",
    width: "100%",
    paddingVertical: 40,
  },
  mainInfo: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
    textTransform: "uppercase",
    fontFamily: "open-sans-bold",
  },
});
export default MedFormDetailsScreen;
