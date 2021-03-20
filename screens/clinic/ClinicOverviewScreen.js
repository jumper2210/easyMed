import React, { useEffect } from 'react';
import {
  Platform,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../UI/CustomHeaderButton';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import ClinicItem from '../../components/AddClinicComponents/ClinicItem';
import * as clinicsActions from '../../store/actions/clinics';
import Colors from '../../constants/Colors';
import CustomButton from '../../UI/Button';

const ClinicOverviewScreen = ({ navigation, route }) => {
  const clinics = useSelector((state) => state.clinicsState.clinics);
  const { _id, role, isAssignClinic, currentClinicId } = route.params;
  const dispatch = useDispatch();
  let display = <ActivityIndicator size='large' color={Colors.secondary} />;
  let currentClinicsArr = [];

  if (clinics) {
    clinics.map((cl) => {
      if (cl._id === currentClinicId) {
        currentClinicsArr.push(cl);
      }
      return currentClinicsArr;
    });
  }

  useEffect(() => {
    dispatch(clinicsActions.loadClinics());
  }, []);

  if (clinics && role === 'ADMIN') {
    display = (
      <FlatList
        data={clinics}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <ClinicItem
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={itemData.item.address}
            onSelect={() => {
              navigation.navigate('ClinicDetailsScreen', {
                clinicTitle: itemData.item.title,
                placeId: itemData.item._id,
              });
            }}
          />
        )}
      />
    );
  }
  if (clinics && isAssignClinic === true) {
    display = (
      <FlatList
        data={currentClinicsArr}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <ClinicItem
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={itemData.item.address}
            onSelect={() => {
              navigation.navigate('ClinicDetailsScreen', {
                clinicTitle: itemData.item.title,
                placeId: itemData.item._id,
              });
            }}
          />
        )}
      />
    );
  }
  if (role === 'PATIENT' && isAssignClinic === false) {
    display = (
      <View>
        <Text style={{ paddingVertical: 40 }}>
          Wygląda na to, że nie jesteś zapisany w żadnej klinicę.
        </Text>
        <CustomButton
          title='Zapisz mnie'
          onPress={() => {
            navigation.navigate('AssignClinicScreen', { _id: _id });
          }}
        />
      </View>
    );
  }
  return <View style={styles.screen}>{display}</View>;
};

export const screenOptions = (navData) => {
  const { role } = navData.route.params;

  return {
    headerTitle: 'Twoja przychodnia',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title=''
          iconName={
            Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        {role === 'ADMIN' ? (
          <Item
            title='AddClinic'
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              navData.navigation.navigate('AddClinicScreen');
            }}
          />
        ) : null}
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ClinicOverviewScreen;
