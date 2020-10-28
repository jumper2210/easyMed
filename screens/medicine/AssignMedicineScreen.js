import React from "react";
import { StyleSheet, View, Button, Text, Alert } from "react-native";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import InputFormik from "../../UI/InputFormik";
import * as Yup from "yup";
import Colors from "../../constants/Colors";
import Card from "../../UI/Card";
import * as medicineActions from "../../store/actions/medicine";

const AssignMedicineScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const infoHandler = (medicineName, quantity, timeOfTaking) => {
    const { patientId, patientName } = route.params;
    Alert.alert(
      "Assign medical",
      `Are you sure you want to assign this medical to ${patientName}?`,
      [
        {
          text: "assign medical",
          onPress: () => {
            dispatch(
              medicineActions.assignMedicine(
                medicineName,
                quantity,
                timeOfTaking,
                patientId
              )
            );
            navigation.navigate("HomeScreen");
          },
        },
        {
          text: "Cancel",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Formik
      initialValues={{ medicineName: "", quantity: "", timeOfTaking: "" }}
      onSubmit={(values) => {
        const { medicineName, quantity, timeOfTaking } = values;
        infoHandler(medicineName, quantity, timeOfTaking);
      }}
      validationSchema={Yup.object().shape({
        medicineName: Yup.string().min(3).required(),
        quantity: Yup.string().min(3).required(),
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
            <InputFormik
              onChangeText={handleChange("medicineName")}
              onBlur={() => setFieldTouched("medicineName")}
              value={values.medicineName}
              label="name of medicine"
            />
            {touched.medicineName && errors.medicineName && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.medicineName}
              </Text>
            )}
            <InputFormik
              onChangeText={handleChange("quantity")}
              onBlur={() => setFieldTouched("quantity")}
              value={values.quantity}
              label="quantity"
            />
            {touched.quantity && errors.quantity && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.quantity}
              </Text>
            )}
            <InputFormik
              onChangeText={handleChange("timeOfTaking")}
              onBlur={() => setFieldTouched("timeOfTaking")}
              value={values.timeOfTaking}
              label="time of taking the medicine"
            />
            {touched.timeOfTaking && errors.timeOfTaking && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.timeOfTaking}
              </Text>
            )}
          </Card>
          <View style={styles.buttonContainer}>
            <Button
              color={Colors.secondary}
              disabled={!isValid}
              onPress={handleSubmit}
              title="Submit"
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  buttonContainer: {
    marginTop: 30,
    height: 80,
    width: 140,
    borderRadius: 8,
  },
  formContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 15,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: `Assign medicine`,
  };
};
export default AssignMedicineScreen;
