import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import InputFormik from '../../UI/InputFormik';
import * as Yup from 'yup';
import Colors from '../../constants/Colors';
import Card from '../../UI/Card';
import * as adminActions from '../../store/actions/admin';
import * as clinicActions from '../../store/actions/clinics';
import { Picker } from '@react-native-picker/picker';

const AssignDoctorAccountScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('Wybierz klinikę');
  const clinics = useSelector((state) => state.clinicsState.clinics);

  useEffect(() => {
    dispatch(clinicActions.loadClinics());
  }, []);

  const infoHandler = (email, password, name, specialization) => {
    Alert.alert(
      'Tworzenie konta lekarza',
      `Jesteś pewien, że chcesz stworzyć te konto?`,
      [
        {
          text: 'stwórz konto',
          onPress: () => {
            dispatch(
              adminActions.AssignDoctorAccount(
                email,
                password,
                name,
                specialization,
                selectedValue
              )
            );
            navigation.navigate('HomeScreen');
          },
        },
        {
          text: 'Anuluj',
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '', specialization: '' }}
      onSubmit={(values) => {
        const { email, password, name, specialization } = values;
        infoHandler(email, password, name, specialization, selectedValue);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().min(5).required(),
        name: Yup.string().min(5).required(),
        specialization: Yup.string().required(),
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
                keyboardVerticalOffset={30}
              >
                <InputFormik
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  value={values.email}
                  label='mail'
                />
                {touched.email && errors.email && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.email}
                  </Text>
                )}
                <InputFormik
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  value={values.password}
                  secureTextEntry
                  label='hasło'
                />
                {touched.password && errors.password && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.password}
                  </Text>
                )}
                <InputFormik
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                  value={values.name}
                  label='Imie i nazwisko'
                />
                {touched.name && errors.name && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.name}
                  </Text>
                )}
                <InputFormik
                  onChangeText={handleChange('specialization')}
                  onBlur={() => setFieldTouched('specialization')}
                  value={values.specialization}
                  label='Specjalizacja'
                />
                {touched.specialization && errors.specialization && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.specialization}
                  </Text>
                )}

                <Picker
                  selectedValue={selectedValue}
                  style={{ height: 100, width: '80%' }}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }
                >
                  <Picker.Item label={selectedValue} />
                  {clinics &&
                    clinics.map((cl) => (
                      <Picker.Item
                        key={cl._id}
                        label={cl.title}
                        value={cl._id}
                      />
                    ))}
                </Picker>
              </KeyboardAvoidingView>
            </ScrollView>
          </Card>
          <View style={styles.buttonContainer}>
            <Button
              color={Colors.secondary}
              disabled={!isValid}
              onPress={handleSubmit}
              title='Submit'
            />
          </View>
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
    marginTop: 30,
    width: 140,
    borderRadius: 8,
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
    height: '65%',
    padding: 15,
  },
});

export default AssignDoctorAccountScreen;
