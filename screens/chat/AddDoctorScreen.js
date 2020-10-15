import React, { useCallback, useReducer, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as doctorsActions from "../../store/actions/doctors";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import Input from "../../UI/Input";
import Button from "../../components/Button";

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

const AddDoctorScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
    },
    inputValidities: {
      email: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const addDoctorHandler = async () => {
    let action;
    action = doctorsActions.addDoctor(formState.inputValues.email);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    setIsLoading(false);
    navigation.goBack();
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

  return (
    <View>
      <Input
        id="email"
        label="E-mail"
        keyboardType="email-address"
        required
        email
        autoCapitalize="none"
        errorMessage="Please enter a valid email address."
        onInputChange={inputChangeHandler}
        initialValue=""
      />
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Button
          style={styles.button}
          title="add doctor"
          onPress={addDoctorHandler}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  button: { paddingHorizontal: 6, marginRight: 12 },
});
export default AddDoctorScreen;
