import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import UserDetailsItem from '../../components/UserComponents/UserDetailsItem';
import Colors from '../../constants/Colors';

const AllPatientsScreen = (props) => {
  const { navigation } = props;
  const patients = useSelector((state) => state.patientsState.patients);
  let display = <ActivityIndicator size='large' color={Colors.secondary} />;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    return unsubscribe;
  }, []);

  if (patients) {
    display = (
      <FlatList
        contentContainerStyle={styles.list}
        data={patients}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) =>
          itemData.item.role == 'PATIENT' ? (
            <UserDetailsItem
              avatar={itemData.item.avatar}
              name={itemData.item.name}
              role={itemData.item.role}
              onPress={() => {
                navigation.navigate('PatientDataScreen', {
                  avatar: itemData.item.avatar,
                  patientName: itemData.item.name,
                  patientMail: itemData.item.email,
                  patientId: itemData.item._id,
                  role: itemData.item.role,
                  patientPhoneNumber: itemData.item.phoneNumber,
                });
              }}
            />
          ) : null
        }
      />
    );
  }

  return <View style={styles.screen}>{display}</View>;
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    padding: 20,
  },
});
export default AllPatientsScreen;
