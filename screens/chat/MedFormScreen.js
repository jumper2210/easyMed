import React, { useState } from "react";
import {
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  View,
  Text,
  Button,
} from "react-native";
import Input from "../../UI/Input";
import Card from "../../UI/Card";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

const MedFormScreen = (props) => {
  const [selectedValue, setSelectedValue] = useState("");

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
            Please fill in information about your symptom's
          </Text>
        </View>
        <Card style={styles.formContainer}>
          <ScrollView>
            <View style={styles.textSymptomContainer}>
              <Text style={styles.textSymptom}>pick your current symptom</Text>
            </View>
            <Picker
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Fever" value="fever" />
              <Picker.Item label="Stomachache" value="stomachache" />
            </Picker>

            <View style={styles.otherInfoContainer}>
              <Text style={styles.otherInfo}>or describe your symptoms</Text>
            </View>
            <Input
              id="others"
              label="others"
              keyboardType="default"
              required
              autoCapitalize="none"
              errorMessage="Please enter your others symptoms."
              onInputChange={() => {}}
              numeric
              initialValue=""
              editable
              maxLength={200}
            />
            <Input
              id="age"
              label="age"
              required
              autoCapitalize="none"
              errorMessage="Please enter your age."
              onInputChange={() => {}}
              keyboardType="decimal-pad"
              initialValue=""
            />
            <Input
              id="scale"
              label="scale"
              keyboardType="decimal-pad"
              required
              autoCapitalize="none"
              errorMessage="Please enter your scale."
              onInputChange={() => {}}
              numeric
              initialValue=""
            />
            <Input
              id="increase"
              label="increase"
              keyboardType="decimal-pad"
              required
              autoCapitalize="none"
              errorMessage="Please enter your increase."
              onInputChange={() => {}}
              numeric
              initialValue=""
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.button}>
                <Button
                  title="Details"
                  onPress={() => {
                    props.navigation.navigate("FormDetails");
                  }}
                />
              </View>
              <Button
                title="Back"
                onPress={() => {
                  props.navigation.navigate("Home");
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
    marginTop: 10,
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
  textSymptomContainer: {
    justifyContent: "center",
    width: "100%",
    paddingVertical: 10,
  },
  textSymptom: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
  },
  otherInfoContainer: {
    justifyContent: "center",
    width: "100%",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "black",
  },
  otherInfo: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
export default MedFormScreen;
