import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import InputFormik from '../../UI/InputFormik';
import * as Yup from 'yup';
import Colors from '../../constants/Colors';
import Card from '../../UI/Card';
import * as userActions from '../../store/actions/user';
import * as doctorActions from '../../store/actions/doctor';
import ImgPicker from '../../components/AddClinicComponents/ImgPicker';
import Button from '../../UI/Button';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditUserDataScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const { name, phoneNumber, avatar, role } = useSelector(
    (state) => state.usersState.selfUser
  );
  let changePassDisplay;
  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  useEffect(() => {
    dispatch(userActions.loadUserData());
  }, []);

  if (role === 'DOCTOR') {
    changePassDisplay = (
      <TouchableOpacity onPress={toggleModal} style={styles.item}>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.primary,
            textTransform: 'uppercase',
            fontFamily: 'open-sans-bold',
          }}
        >
          Zmień hasło
        </Text>
        <Modal
          backdropOpacity={0.4}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <Formik
            initialValues={{
              password: '',
            }}
            onSubmit={(values) => {
              const { password } = values;
              dispatch(doctorActions.editPassword(password));
              navigation.navigate('HomeScreen');
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string().min(5),
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
              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  height: '60%',
                  alignItems: 'center',
                }}
              >
                <Card style={styles.formContainer}>
                  <KeyboardAvoidingView
                    behavior='padding'
                    keyboardVerticalOffset={35}
                  >
                    <InputFormik
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      value={values.password}
                      secureTextEntry
                      label='Wpisz nowe hasło'
                    />
                    {touched.password && errors.password && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.password}
                      </Text>
                    )}
                    <View style={styles.buttonContainer}>
                      <Button
                        color={Colors.secondary}
                        disabled={!isValid}
                        onPress={handleSubmit}
                        title='Potwierdź'
                      />
                    </View>
                  </KeyboardAvoidingView>
                </Card>
              </View>
            )}
          </Formik>
        </Modal>
      </TouchableOpacity>
    );
  }
  return (
    <Formik
      initialValues={{
        editName: name,
        editPhoneNumber: phoneNumber,
        avatar: avatar,
      }}
      onSubmit={(values) => {
        const { editName, editPhoneNumber, avatar } = values;
        let avatarResult = '';
        if (avatar !== selectedImage) {
          avatarResult = selectedImage;
        } else {
          avatarResult = avatar;
        }

        dispatch(userActions.editUser(editName, editPhoneNumber, avatarResult));
        navigation.navigate('HomeScreen');
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
                  label='Twoja nazwa'
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
                  label='Twój numer telefonu'
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
              {changePassDisplay}
            </ScrollView>
          </Card>
        </View>
      )}
    </Formik>
  );
};

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
    height: '90%',
    padding: 15,
  },
  item: {
    backgroundColor: Colors.details,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    elevation: 0,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    height: 40,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
});

export default EditUserDataScreen;
