import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Picker, Alert } from 'react-native';
import * as clinicActions from '../../store/actions/clinics';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../UI/CustomHeaderButton';
import * as authActions from '../../store/actions/auth';

const AssignClinicScreen = ({ navigation, route }) => {
  const { _id } = route.params;
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('');
  const clinics = useSelector((state) => state.clinicsState.clinics);

  useEffect(() => {
    dispatch(clinicActions.loadClinics());
  }, []);

  const infoHandler = () => {
    Alert.alert(
      'Sukces!',
      'Zostaniesz teraz wylogowany z twojego konta.',
      [
        {
          text: 'Wyloguj',
          onPress: () => {
            dispatch(authActions.logout());
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 100, width: '80%' }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {clinics &&
          clinics.map((cl) => (
            <Picker.Item key={cl._id} label={cl.title} value={cl._id} />
          ))}
      </Picker>
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton} iconSize={60}>
        <Item
          title=''
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            dispatch(clinicActions.assignClinic(selectedValue, _id));
            infoHandler(_id);
          }}
        />
      </HeaderButtons>
    </View>
  );
};

export default AssignClinicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
