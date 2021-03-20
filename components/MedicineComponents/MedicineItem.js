import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../constants/Colors';
import constants from '../../constants/Constants';
import Button from '../../UI/Button';
import * as Yup from 'yup';
import InputFormik from '../../UI/InputFormik';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as medicineActions from '../../store/actions/medicine';

const MedicineControlItem = (props) => {
  const { name, timeOfTaking, isEdited, medicineId } = props;
  const dispatch = useDispatch();
  console.log(isEdited);
  let display = null;
  if (isEdited === false) {
    display = (
      <Formik
        initialValues={{
          editTimeOfTaking: timeOfTaking,
        }}
        onSubmit={(values) => {
          const { editTimeOfTaking } = values;
          dispatch(medicineActions.editMedicine(editTimeOfTaking, medicineId));
          // navigation.navigate('HomeScreen');
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
          <View style={styles.item}>
            <View style={styles.touchable}>
              <View style={styles.data}>
                <Text style={styles.infoText}>Ten lek został edytowany</Text>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{name}</Text>
                </View>
                <ScrollView>
                  <KeyboardAvoidingView
                    behavior='padding'
                    keyboardVerticalOffset={35}
                  >
                    <InputFormik
                      numberOfLines={10}
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
                    <View style={styles.editButton}>
                      <Button title='Edytuj' onPress={handleSubmit} />
                    </View>
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </View>
          </View>
        )}
      </Formik>
    );
  }

  if (isEdited === true) {
    display = (
      <Formik
        initialValues={{
          editTimeOfTaking: timeOfTaking,
        }}
        onSubmit={(values) => {
          const { editTimeOfTaking } = values;
          dispatch(medicineActions.editMedicine(editTimeOfTaking, medicineId));
          // navigation.navigate('HomeScreen');
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
          <View style={styles.itemIsEdited}>
            <View style={styles.touchable}>
              <View style={styles.data}>
                <Text style={styles.infoText}>Ten lek został edytowany</Text>
                <View style={styles.nameContainer}>
                  <Text style={styles.editName}>{name}</Text>
                </View>
                <ScrollView>
                  <KeyboardAvoidingView
                    behavior='padding'
                    keyboardVerticalOffset={35}
                  >
                    <InputFormik
                      numberOfLines={4}
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
                    <View style={styles.editButton}>
                      <Button title='Edytuj' onPress={handleSubmit} />
                    </View>
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </View>
          </View>
        )}
      </Formik>
    );
  }

  return <View>{display}</View>;
};

const styles = StyleSheet.create({
  item: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    height: constants.screenHeight - 320,
    justifyContent: 'space-between',
  },
  editButton: {
    marginTop: 50,
    alignItems: 'center',
  },
  itemIsEdited: {
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.details,
    height: constants.screenHeight - 320,
    justifyContent: 'space-evenly',
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  data: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  name: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'left',
    color: Colors.details,
  },
  editName: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'left',
    color: Colors.primary,
  },
  // timeOfTaking: {
  //   fontFamily: 'open-sans-bold',
  //   fontSize: 22,
  //   marginVertical: 12,
  //   color: Colors.secondary,
  // },
  // editTimeOfTaking: {
  //   fontFamily: 'open-sans-bold',
  //   fontSize: 22,
  //   marginVertical: 12,
  //   color: Colors.primary,
  // },
  infoText: {
    textAlign: 'center',
    paddingVertical: 23,
    fontSize: 25,
    color: Colors.primary,
  },
});

export default MedicineControlItem;
