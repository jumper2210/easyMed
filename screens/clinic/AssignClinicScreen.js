import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as clinicActions from '../../store/actions/clinics';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import ChatMateItem from '../../components/ChatComponents/ChatMateItem';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

const AssignClinicScreen = ({ navigation, route }) => {
  const { _id } = route.params;
  const dispatch = useDispatch();
  // const [selectedValue, setSelectedValue] = useState();
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
      <FlatList
        data={clinics}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <ChatMateItem
            name={itemData.item.title}
            onSelect={() => {
              dispatch(clinicActions.assignClinic(itemData.item._id, _id));
              infoHandler();
            }}
          />
        )}
      />
    </View>
  );
};

export default AssignClinicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
});
