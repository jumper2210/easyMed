import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import InputFormik from '../../UI/InputFormik';
import * as Yup from 'yup';
import Colors from '../../constants/Colors';
import * as healthInformationActions from '../../store/actions/healthInformation';
import Button from '../../UI/Button';

const AddHealthNotesScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { healthInformationId } = route.params;

  const checkHealthInformationHandler = (healthInformationId, doctorNotes) => {
    Alert.alert(
      'Zapisz swoje uwagi dla pacjenta',
      '',
      [
        {
          text: 'Zapisz',
          onPress: () => {
            navigation.goBack();
            dispatch(
              healthInformationActions.checkHealthInformation(
                healthInformationId,
                doctorNotes
              )
            );
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
      initialValues={{
        doctorNotes: '',
      }}
      onSubmit={(values) => {
        const { doctorNotes } = values;
        checkHealthInformationHandler(healthInformationId, doctorNotes);
        navigation.goBack();
      }}
      validationSchema={Yup.object().shape({
        doctorNotes: Yup.string(),
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
          <View style={styles.item}>
            <Text style={styles.name}>{medicineName}</Text>
            <ScrollView>
              <KeyboardAvoidingView
                behavior='padding'
                keyboardVerticalOffset={35}
              >
                <InputFormik
                  numberOfLines={2}
                  onChangeText={handleChange('doctorNotes')}
                  onBlur={() => setFieldTouched('doctorNotes')}
                  value={values.doctorNotes}
                  label='Uwagi dla pacjenta'
                />
                {touched.doctorNotes && errors.doctorNotes && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.doctorNotes}
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
            </ScrollView>
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
    paddingVertical: 20,
  },
  item: {
    backgroundColor: Colors.primary,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    width: '90%',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'open-sans-bold',
    fontSize: 30,
    textAlign: 'center',
    color: Colors.details,
  },
});

export default AddHealthNotesScreen;
