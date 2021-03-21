import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import InputFormik from '../../UI/InputFormik';
import * as Yup from 'yup';
import Colors from '../../constants/Colors';
import Card from '../../UI/Card';
import * as medicineActions from '../../store/actions/medicine';

const AssignMedicineScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const infoHandler = (medicineName, timeOfTaking) => {
    const { patientId } = route.params;
    Alert.alert(
      'Jesteś pewien?',
      ``,
      [
        {
          text: 'Przypisz',
          onPress: () => {
            dispatch(
              medicineActions.assignMedicine(
                medicineName,
                timeOfTaking,
                patientId
              )
            );
            navigation.goBack();
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
      initialValues={{ medicineName: '', timeOfTaking: '' }}
      onSubmit={(values) => {
        const { medicineName, timeOfTaking } = values;
        infoHandler(medicineName, timeOfTaking);
      }}
      validationSchema={Yup.object().shape({
        medicineName: Yup.string().min(3).required(),
        timeOfTaking: Yup.string().min(3).required(),
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
                  onChangeText={handleChange('medicineName')}
                  onBlur={() => setFieldTouched('medicineName')}
                  value={values.medicineName}
                  label='Nazwa leku'
                />
                {touched.medicineName && errors.medicineName && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.medicineName}
                  </Text>
                )}
                <InputFormik
                  numberOfLines={6}
                  onChangeText={handleChange('timeOfTaking')}
                  onBlur={() => setFieldTouched('timeOfTaking')}
                  value={values.timeOfTaking}
                  label='przyjmowanie'
                />
                {touched.timeOfTaking && errors.timeOfTaking && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.timeOfTaking}
                  </Text>
                )}
              </KeyboardAvoidingView>
            </ScrollView>
          </Card>
          <View style={styles.buttonContainer}>
            <Button
              color={Colors.secondary}
              disabled={!isValid}
              onPress={handleSubmit}
              title='Potwierdź'
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  buttonContainer: {
    marginTop: 30,
    height: 80,
    width: 140,
    borderRadius: 8,
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 15,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: `Przypisanie lekarstwa`,
  };
};
export default AssignMedicineScreen;
