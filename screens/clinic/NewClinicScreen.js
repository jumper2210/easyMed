import React, { useState, useCallback } from 'react'
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native'
import { useDispatch } from 'react-redux'
import * as clinicsActions from '../../store/actions/clinics'
import Colors from '../../constants/Colors'
import ImgPicker from '../../components/AddClinicComponents/ImgPicker'
import LocationPicker from '../../components/AddClinicComponents/LocationPicker'

const NewClinicScreen = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState()
  const [titleValue, setTitleValue] = useState('')
  const [selectedLocation, setSelectedLocation] = useState()

  const titleChangedHandler = (text) => {
    setTitleValue(text)
  }

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath)
  }

  const saveClinicHandler = () => {
    dispatch(
      clinicsActions.addClinic(titleValue, selectedImage, selectedLocation)
    )
    navigation.goBack()
  }

  const locationPickerHandler = useCallback((location) => {
    setSelectedLocation(location)
  }, [])

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Nazwa</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangedHandler}
          value={titleValue}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickerHandler}
          route={props.route}
        />
        <View style={styles.saveButton}>
          <Button
            title='Zapisz przychodnię'
            color={Colors.secondary}
            onPress={saveClinicHandler}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export const screenOptions = { headerTitle: 'Zapisz przychodnię' }

const styles = StyleSheet.create({
  form: {
    padding: 15,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,

    paddingHorizontal: 2,
  },
  saveButton: {
    marginTop: 25,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
})

export default NewClinicScreen
