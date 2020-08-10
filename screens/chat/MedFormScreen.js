import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import Input from "../../UI/Input";
import Card from "../../UI/Card";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import ImgPicker from "../../components/AddClinicComponents/ImgPicker";
import * as medicalCaseActions from "../../store/actions/medicalCase";
import Button from "../../components/Button";
import Constants from "../../constants/Constants";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};
const MedFormScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("fever");
  const [isFormDetails, setIsFormDetails] = useState(false);
  const [error, setError] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      otherSymptom: "",
      age: "",
      scale: "",
      increase: "",
      locationOfPain: "",
      radiance: "",
    },
    inputValidities: {
      others: false,
      age: false,
      scale: false,
      increase: false,
      locationOfPain: false,
      radiance: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const formHandler = async () => {
    let action = null;
    action = medicalCaseActions.createMedicalCase(
      selectedImage,
      selectedValue,
      formState.inputValues.otherSymptom,
      formState.inputValues.age,
      formState.inputValues.scale,
      formState.inputValues.increase,
      formState.inputValues.locationOfPain,
      formState.inputValues.radiance
    );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  let detailsDisplay = null;

  if (isFormDetails === true) {
    detailsDisplay = (
      <View>
        <Card style={styles.cardContainer}>
          <Input
            id="escalation"
            label="escalation of pain. *if relevant"
            keyboardType="default"
            autoCapitalize="none"
            errorMessage="Enter any specific's. *If relevant."
            onInputChange={inputChangeHandler}
            initialValue=""
            editable
            maxLength={20}
          />
          <Input
            id="locationOfPain"
            label="location of pain. *if relevant"
            keyboardType="default"
            autoCapitalize="none"
            errorMessage="determine where you feel pain. *If relevant."
            onInputChange={inputChangeHandler}
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
            onInputChange={inputChangeHandler}
            initialValue=""
            editable
            maxLength={40}
          />
          <ImgPicker onImageTaken={imageTakenHandler} />

          <View style={styles.buttonsContainer}>
            <Button
              style={styles.button}
              title="Create Form"
              onPress={() => {
                formHandler();
                console.log("click");
              }}
            />

            <Button
              style={styles.button}
              title="Back"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          </View>
        </Card>
      </View>
    );
  }
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
        <ScrollView>
          <Card style={styles.cardContainer}>
            <View style={styles.textSymptomContainer}>
              <Text style={styles.textSymptom}>pick your current symptom</Text>
            </View>
            <Picker
              selectedValue={selectedValue}
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
              id="otherSymptom"
              label="other symptom"
              keyboardType="default"
              required
              autoCapitalize="none"
              errorMessage="Please enter your others symptoms."
              onInputChange={inputChangeHandler}
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
              onInputChange={inputChangeHandler}
              keyboardType="decimal-pad"
              initialValue=""
            />
            <Input
              id="scale"
              label="scale of pain (0-10)"
              keyboardType="decimal-pad"
              required
              autoCapitalize="none"
              errorMessage="Please enter your scale."
              onInputChange={inputChangeHandler}
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
              onInputChange={inputChangeHandler}
              numeric
              initialValue=""
            />
            <View style={styles.buttonsContainer}>
              <Button
                style={styles.button}
                title={isFormDetails ? "Hide details" : " Show details"}
                onPress={() => {
                  setIsFormDetails(true);
                }}
              />

              <Button
                style={styles.button}
                title="Back"
                onPress={() => {
                  navigation.navigate("Home");
                  setIsFormDetails(false);
                }}
              />
            </View>
          </Card>
          {detailsDisplay}
        </ScrollView>
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
    paddingVertical: 20,
  },
  button: { paddingHorizontal: 6, marginRight: 12 },
  cardContainer: {
    width: Constants.screenWidth - 65,
    maxHeight: 580,
    padding: 24,
    marginVertical: 15,
  },
  mainInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 30,
  },
  mainInfo: {
    fontSize: 10,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "open-sans-bold",
  },
  textSymptomContainer: {
    justifyContent: "center",
    width: "100%",
    paddingVertical: 10,
  },
  textSymptom: {
    fontSize: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  otherInfoContainer: {
    justifyContent: "center",
    width: "100%",
    paddingVertical: 20,
  },
  otherInfo: {
    fontSize: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
export default MedFormScreen;
