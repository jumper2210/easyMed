import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import * as clinicsActions from "../../store/actions/clinics/clinics-actions";
import Colors from "../../constants/Colors";
import ImgPicker from "../../components/AddClinicComponents/ImgPicker";
import LocationPicker from "../../components/AddClinicComponents/LocationPicker";

const NewClinicScreen = (props) => {
  const [selectedImage, setSelectedImage] = useState();
  const [titleValue, setTitleValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();

  const titleChangedHandler = (text) => {
    setTitleValue(text);
  };
  const dispatch = useDispatch();

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const saveClinicHandler = () => {
    dispatch(
      clinicsActions.addClinic(titleValue, selectedImage, selectedLocation)
    );
    props.navigation.goBack();
  };

  const locationPickerHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
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
            title="Save Clinic"
            color={Colors.secondary}
            onPress={saveClinicHandler}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export const screenOptions = { headerTitle: "Add Your Clinic" };

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  saveButton: {
    marginTop: 25,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});

export default NewClinicScreen;
