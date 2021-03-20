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
import Card from '../../UI/Card';
import * as medicineActions from '../../store/actions/medicine';
import Button from '../../UI/Button';

const EditMedicineScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { timeOfTaking, medicineId, medicineName } = route.params;
  return (
    <Formik
      initialValues={{
        editTimeOfTaking: timeOfTaking,
      }}
      onSubmit={(values) => {
        const { editTimeOfTaking } = values;
        dispatch(medicineActions.editMedicine(editTimeOfTaking, medicineId));
        navigation.goBack();
      }}
      validationSchema={Yup.object().shape({
        editTimeOfTaking: Yup.string(),
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
                  onChangeText={handleChange('editTimeOfTaking')}
                  onBlur={() => setFieldTouched('editTimeOfTaking')}
                  value={values.editTimeOfTaking}
                  label='Przyjmowanie'
                />
                {touched.editTimeOfTaking && errors.editTimeOfTaking && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.editTimeOfTaking}
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
    // height: '60%',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'open-sans-bold',
    fontSize: 30,
    textAlign: 'center',
    color: Colors.details,
  },
});

export default EditMedicineScreen;
