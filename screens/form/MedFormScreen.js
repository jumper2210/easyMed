import React, { useState, useEffect, useReducer, useCallback } from 'react'
import {
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import SendPushNotificationToServer from '../../helpers/sendPushNotificationToServer'
import Input from '../../UI/Input'
import Card from '../../UI/Card'
import Colors from '../../constants/Colors'
import ImgPicker from '../../components/AddClinicComponents/ImgPicker'
import * as medicalCaseActions from '../../store/actions/medicalCase'
import Button from '../../UI/Button'
import Constants from '../../constants/Constants'
import * as userActions from '../../store/actions/user'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    }
    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    }
  }
  return state
}
const MedFormScreen = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()
  const [selectedValue, setSelectedValue] = useState('')
  const [isFormDetails, setIsFormDetails] = useState(false)
  const [error, setError] = useState()
  const [selectedImage, setSelectedImage] = useState()
  const [isLoading, setIsLoading] = useState(false)
  let action = null
  const patientName = useSelector((state) => state.usersState.selfUser.name)

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      otherSymptom: '',
      age: '',
      scale: '',
      increase: '',
      locationOfPain: '',
      radiance: '',
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
  })

  useEffect(() => {
    dispatch(userActions.loadUserData())
  }, [])

  useEffect(() => {
    if (error) {
      Alert.alert('Wykryto błąd!', error, [{ text: 'Ok' }])
    }
  }, [error])

  const infoHandler = (patientName) => {
    Alert.alert(
      'Czy jestes pewien, że chcesz stworzyć ten formularz medczyny ',
      '',
      [
        {
          text: 'Tak',
          onPress: () => {
            navigation.navigate('HomeScreen')
            SendPushNotificationToServer(patientName)
          },
        },
      ],
      { cancelable: false }
    )
  }

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath)
  }

  const formHandler = async () => {
    action = medicalCaseActions.createMedicalCase(
      selectedImage,
      selectedValue,
      formState.inputValues.otherSymptom,
      formState.inputValues.age,
      formState.inputValues.scale,
      formState.inputValues.increase,
      formState.inputValues.locationOfPain,
      formState.inputValues.radiance
    )
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(action)
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      })
    },
    [dispatchFormState]
  )

  let detailsDisplay = null

  if (isFormDetails === true) {
    detailsDisplay = (
      <View>
        <Card style={styles.cardContainer}>
          <Input
            id='escalation'
            label='*podaj nasilenie bólu'
            keyboardType='default'
            autoCapitalize='none'
            errorMessage='przekroczono ilość słów'
            onInputChange={inputChangeHandler}
            initialValue=''
            editable
            maxLength={20}
          />
          <Input
            id='locationOfPain'
            label='*miejsce bólu'
            keyboardType='default'
            autoCapitalize='none'
            errorMessage='przekroczono ilość słów'
            onInputChange={inputChangeHandler}
            initialValue=''
            editable
            maxLength={20}
          />
          <Input
            id='radiance'
            label='*promieniowanie bólu'
            keyboardType='default'
            autoCapitalize='none'
            errorMessage='przekroczono ilość słów'
            onInputChange={inputChangeHandler}
            initialValue=''
            editable
            maxLength={40}
          />
          <ImgPicker onImageTaken={imageTakenHandler} />

          <View style={styles.buttonsContainer}>
            <Button
              style={styles.button}
              title='Stwórz formularz'
              onPress={() => {
                formHandler()
                infoHandler(patientName)
              }}
            />

            <Button
              style={styles.button}
              title='Wróć'
              onPress={() => {
                navigation.navigate('HomeScreen')
              }}
            />
          </View>
        </Card>
      </View>
    )
  }
  return (
    <KeyboardAvoidingView
      behavior='height'
      keyboardVerticalOffset={50}
      style={{ flex: 1 }}
    >
      <View style={styles.gradient}>
        <ScrollView>
          <Card style={styles.cardContainer}>
            <View style={styles.textSymptomContainer}>
              <Text style={styles.textSymptom}>Wybierz swój symptom</Text>
            </View>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label='Wybierz swój symptom' value='' />
              <Picker.Item label='Ból głowy' value='gorączka' />
              <Picker.Item label='Ból brzucha' value='ból brzucha' />
            </Picker>
            <View style={styles.inputsContainer}>
              <Input
                id='otherSymptom'
                label='Wpisz inne symptomy, jeśli nic więcej nie odczuwasz wpisz (brak)'
                keyboardType='default'
                required
                autoCapitalize='none'
                errorMessage='Wpisze inne symptomy.'
                onInputChange={inputChangeHandler}
                numeric
                initialValue=''
                editable
                maxLength={200}
              />
              <Input
                id='age'
                label='wiek'
                required
                autoCapitalize='none'
                errorMessage='Podaj swój wiek.'
                onInputChange={inputChangeHandler}
                keyboardType='decimal-pad'
                initialValue=''
              />
              <Input
                id='scale'
                label='Podaj skalę bólu (0-10)'
                keyboardType='decimal-pad'
                required
                autoCapitalize='none'
                errorMessage='Podaj skalę twojego bólu.'
                onInputChange={inputChangeHandler}
                numeric
                initialValue=''
              />
              <Input
                id='increase'
                label='wzrost'
                keyboardType='decimal-pad'
                required
                autoCapitalize='none'
                errorMessage='Podaj twój wzrost.'
                onInputChange={inputChangeHandler}
                numeric
                initialValue=''
              />
              <View style={styles.buttonsContainer}>
                <Button
                  style={styles.button}
                  title={isFormDetails ? 'Ukrj szczegóły' : 'Pokaż szczegóły'}
                  onPress={() => {
                    setIsFormDetails(!isFormDetails)
                  }}
                />

                <Button
                  style={styles.button}
                  title='Wróć'
                  onPress={() => {
                    navigation.navigate('Home')
                    setIsFormDetails(false)
                  }}
                />
              </View>
            </View>
          </Card>
          {detailsDisplay}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  inputsContainer: {
    paddingTop: 60,
  },
  button: { paddingHorizontal: 6, marginRight: 12 },
  cardContainer: {
    width: Constants.screenWidth - 65,
    maxHeight: 580,
    padding: 24,
    marginVertical: 15,
    elevation: 0,
  },
  mainInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 30,
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
  otherInfoContainer: {
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  otherInfo: {
    fontSize: 11,
    fontFamily: 'open-sans',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: Colors.secondary,
  },
})
export default MedFormScreen
