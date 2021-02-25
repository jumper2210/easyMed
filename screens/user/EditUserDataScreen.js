import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import InputFormik from '../../UI/InputFormik'
import * as Yup from 'yup'
import Colors from '../../constants/Colors'
import Card from '../../UI/Card'
import * as userActions from '../../store/actions/user'
import ImgPicker from '../../components/AddClinicComponents/ImgPicker'
import Button from '../../UI/Button'
const EditUserDataScreen = (props) => {
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState()
  const selfUser = useSelector((state) => state.usersState.selfUser)
  const { navigation } = props
  const name = selfUser.name
  const phoneNumber = selfUser.phoneNumber
  const avatar = selfUser.avatar

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath)
  }

  useEffect(() => {
    dispatch(userActions.loadUserData())
  }, [])

  return (
    <Formik
      initialValues={{
        editName: name,
        editPhoneNumber: phoneNumber,
        avatar: avatar,
      }}
      onSubmit={(values) => {
        const { editName, editPhoneNumber, avatar } = values
        let avatarResult = ''
        if (avatar !== selectedImage) {
          avatarResult = selectedImage
        } else {
          avatarResult = avatar
        }

        dispatch(userActions.editUser(editName, editPhoneNumber, avatarResult))
        navigation.navigate('HomeScreen')
      }}
      validationSchema={Yup.object().shape({
        editName: Yup.string(),
        editPhoneNumber: Yup.number().min(9),
      })}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        isValid,
        errors,
        setFieldTouched,
        touched,
      }) => (
        <View style={styles.screen}>
          <Card style={styles.formContainer}>
            <ScrollView>
              <KeyboardAvoidingView
                behavior='padding'
                keyboardVerticalOffset={35}
              >
                <InputFormik
                  onChangeText={handleChange('editName')}
                  onBlur={() => setFieldTouched('editName')}
                  value={values.editName}
                  label='twoja nazwa'
                />
                {touched.editName && errors.editName && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.editName}
                  </Text>
                )}
                <InputFormik
                  onChangeText={handleChange('editPhoneNumber')}
                  onBlur={() => setFieldTouched('editPhoneNumber')}
                  value={values.editPhoneNumber}
                  label='twój numer telefonu'
                />
                {touched.editPhoneNumber && errors.editPhoneNumber && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.editPhoneNumber}
                  </Text>
                )}
                <ImgPicker onImageTaken={imageTakenHandler} />
                <View style={styles.buttonContainer}>
                  <Button
                    color={Colors.secondary}
                    disabled={!isValid}
                    onPress={handleSubmit}
                    title='Potwierdź'
                  />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </Card>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  buttonContainer: {
    paddingVertical: 20,
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    height: '85%',
    padding: 15,
  },
})

export default EditUserDataScreen
