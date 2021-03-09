import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Input from '../UI/Input';
import Card from '../UI/Card';
import Colors from '../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import Button from '../UI/Button';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

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

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      name: '',
    },
    inputValidities: {
      email: false,
      password: false,
      name: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Wykryto błąd!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.name
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.name
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
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

  return (
    <View style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={25}>
            <Input
              id='email'
              label='E-mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorMessage='Please enter a valid email address.'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <Input
              id='password'
              label='hasło'
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorMessage='Please enter a valid password.'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            {isSignUp === true ? (
              <Input
                id='name'
                label='nazwa'
                keyboardType='default'
                required
                minLength={5}
                autoCapitalize='none'
                errorMessage='Please enter a valid name.'
                onInputChange={inputChangeHandler}
                initialValue=''
              />
            ) : null}

            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size='small' color={Colors.secondary} />
              ) : (
                <Button
                  style={{ width: '80%' }}
                  title={isSignUp ? 'Zajerestruj się' : 'Zaloguj'}
                  onPress={authHandler}
                />
              )}

              <Button
                style={{ width: '80%' }}
                title={`Zamień na ${isSignUp ? 'logowanie' : 'rejestracje'}`}
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Card>
    </View>
  );
};

export const screenOptions = {
  headerTitle: '',
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 15,
  },
  buttonContainer: {
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
  },
});
export default AuthScreen;
