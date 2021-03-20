import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import SendPushNotificationToServer from '../../helpers/sendPushNotificationToServer';
import Input from '../../UI/Input';
import Card from '../../UI/Card';
import Colors from '../../constants/Colors';
import ImgPicker from '../../components/AddClinicComponents/ImgPicker';
import * as healthInformationActions from '../../store/actions/healthInformation';
import Button from '../../UI/Button';
import Constants from '../../constants/Constants';
import * as userActions from '../../store/actions/user';

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
const MedFormScreen = (props) => {
  const { navigation } = props;
  const { doctorId, _id } = props.route.params;
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const patientName = useSelector((state) => state.usersState.selfUser.name);
  let action = null;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      symptom: '',
      weight: '',
    },
    inputValidities: {
      symptom: false,
      weight: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    dispatch(userActions.loadUserData());
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Wykryto błąd!', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  const infoHandler = (patientName, doctorId, _id) => {
    Alert.alert(
      'Wybierz dogodny dla Ciebie termin',
      '',
      [
        {
          text: 'Wybierz termin',
          onPress: () => {
            navigation.navigate('DoctorsAppointmentScreen', { doctorId, _id });
            SendPushNotificationToServer(patientName);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const formHandler = async () => {
    action = healthInformationActions.createHealthInformation(
      selectedImage,
      formState.inputValues.symptom,
      formState.inputValues.weight
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

  return (
    <View style={styles.screen}>
      <Card style={styles.cardContainer}>
        <ScrollView>
          <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={50}>
            <View style={styles.inputsContainer}>
              <Input
                id='symptom'
                label='*Co Ci dolega?'
                keyboardType='default'
                required
                autoCapitalize='none'
                errorMessage='Wpisz co Ci dolega'
                onInputChange={inputChangeHandler}
                numeric
                initialValue=''
                editable
                maxLength={200}
              />
              <Input
                id='weight'
                label='Podaj swoją wagę'
                keyboardType='decimal-pad'
                autoCapitalize='none'
                errorMessage='Podaj swoją wagę'
                onInputChange={inputChangeHandler}
                numeric
                initialValue=''
              />
              <View style={{ paddingVertical: 20 }}>
                <ImgPicker onImageTaken={imageTakenHandler} />
              </View>

              <View style={styles.buttonsContainer}>
                <Button
                  style={styles.button}
                  title='Stwórz swój opis zdrowia'
                  onPress={() => {
                    formHandler();
                    infoHandler(patientName, doctorId, _id);
                  }}
                />
                <Button
                  style={styles.button}
                  title='Wróć'
                  onPress={() => {
                    navigation.navigate('HomeScreen');
                  }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  inputsContainer: {
    paddingTop: 30,
  },
  button: { marginRight: 12 },
  cardContainer: {
    width: Constants.screenWidth - 65,
    maxHeight: 620,
    padding: 24,
    elevation: 0,
  },
  mainInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 30,
  },
  otherInfoContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  mainInfo: {
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'open-sans-bold',
    color: Colors.details,
  },
  textSymptomContainer: {
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 25,
  },
  textSymptom: {
    fontSize: 13,
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: Colors.secondary,
  },
  otherInfo: {
    fontSize: 11,
    fontFamily: 'open-sans',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: Colors.secondary,
  },
});
export default MedFormScreen;
