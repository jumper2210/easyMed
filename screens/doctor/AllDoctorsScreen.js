import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import UserDetailsItem from '../../components/UserComponents/UserDetailsItem';
import Colors from '../../constants/Colors';

const AllDoctorsScreen = ({ navigation, route }) => {
  const doctors = useSelector((state) => state.doctorsState.doctors);
  const { _id } = route.params;
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    return unsubscribe;
  }, []);

  let display = <ActivityIndicator size='large' color={Colors.secondary} />;

  if (doctors) {
    display = (
      <FlatList
        contentContainerStyle={styles.list}
        data={doctors}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) =>
          itemData.item.role === 'DOCTOR' ? (
            <UserDetailsItem
              avatar={itemData.item.avatar}
              name={itemData.item.name}
              // specialization={itemData.item.specialization}
              onPress={() => {
                navigation.navigate('DoctorDataScreen', {
                  avatar: itemData.item.avatar,
                  doctorName: itemData.item.name,
                  doctorMail: itemData.item.email,
                  doctorId: itemData.item._id,
                  doctorPhoneNumber: itemData.item.phoneNumber,
                  role: itemData.item.role,
                  specialization: itemData.item.specialization,
                  _id: _id,
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
export default AllDoctorsScreen;
