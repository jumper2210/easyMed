import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import HealthInformation from '../../models/healthInformation';
import * as healthInformationActions from '../../store/actions/healthInformation';
import HealthInformationItem from '../../components/HealthInformationComponents/HealthInformationItem';

const PatientHealthinformationsScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  let medicalHistory = [];
  const healthInformations = useSelector(
    (state) => state.healthInformationState.healthInformations
  );
  const { _id, role, name } = useSelector((state) => state.usersState.selfUser);

  useEffect(() => {
    dispatch(healthInformationActions.loadPatientHealthInformation(_id));
  }, []);

  healthInformations.map((mc) => {
    if (mc.resolved === true) {
      medicalHistory.push(
        new HealthInformation(
          mc._id.toString(),
          mc.name,
          mc.age,
          mc.increase,
          mc.locationOfPain,
          mc.symptom,
          mc.radiance,
          mc.scale,
          mc.createdAt,
          mc.imageUri,
          mc.resolved
        )
      );
      return medicalHistory;
    }
  });
  let display = (
    <Text style={styles.info}>
      Nie posiadasz historii medycznej w tej przychodni.
    </Text>
  );
  console.log(medicalHistory);
  if (medicalHistory.length >= 1) {
    display = (
      <FlatList
        data={medicalHistory}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <HealthInformationItem
            createdAt={itemData.item.createdAt}
            onPress={() => {
              navigation.navigate('HealthInformationDetailsScreen', {
                age: itemData.item.age,
                name: name,
                increase: itemData.item.increase,
                locationOfPain: itemData.item.locationOfPain,
                symptom: itemData.item.symptom,
                radiance: itemData.item.radiance,
                scale: itemData.item.scale,
                createdAt: itemData.item.createdAt,
                imageUri: itemData.item.imageUri,
                role: role,
              });
            }}
          />
        )}
      />
    );
  }
  return <View style={styles.screen}>{display}</View>;
};
export const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  info: {
    paddingHorizontal: 12,
    fontFamily: 'open-sans',
    fontSize: 20,
    color: Colors.secondary,
    textAlign: 'center',
  },
});

export default PatientHealthinformationsScreen;
