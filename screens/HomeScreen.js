import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Platform, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../UI/CustomHeaderButton'
import NavigationItem from '../components/NavigationItem'
import { ScrollView } from 'react-native-gesture-handler'
import * as userActions from '../store/actions/user'
import * as authActions from '../store/actions/auth'
// import RegisterForPushNotifications from '../helpers/registerForPushNotifications'
import CustomButton from '../UI/Button'

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { role, isAssignClinic } = useSelector(
    (state) => state.usersState.selfUser
  )
  let display = null
  // console.log(isAssignClinic, role)

  // useEffect(() => {
  //   if (role === 'DOCTOR') {
  //     RegisterForPushNotifications()
  //   }
  // }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(userActions.loadUserData())
    })
    return unsubscribe
  }, [])

  const noAssignClnicHandler = () => {
    Alert.alert(
      'Brak kliniki',
      'Wygląda na to, że nie masz przypisanej kliniki',
      [
        {
          text: 'Anuluj',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Wybierz swoją klinikę',
          onPress: () => navigation.navigate('AssignClinicScreen'),
        },
      ],
      { cancelable: false }
    )
  }

  if (isAssignClinic === false && role !== 'ADMIN') {
    noAssignClnicHandler()
    display = (
      <View style={styles.noAssignClinic}>
        <CustomButton
          title='Wybierz swoją klinikę'
          onPress={() => navigation.navigate('AssignClinicScreen')}
        />
      </View>
    )
  }
  if (role === 'PATIENT' && isAssignClinic) {
    display = (
      <View style={styles.screen}>
        <NavigationItem
          name={'Przychodnia'}
          iconName={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}
          onPress={() => {
            navigation.navigate('ClinicScreen', { role: role })
          }}
        />

        <NavigationItem
          name={'Moje konto'}
          iconName={Platform.OS === 'android' ? 'md-contact' : 'ios-contact'}
          onPress={() => {
            navigation.navigate('UserAccountScreen')
          }}
        />
        <NavigationItem
          name={'Formularz medyczyny'}
          iconName={
            Platform.OS === 'android'
              ? 'md-add-circle-outline'
              : 'ios-add-circle-outline'
          }
          onPress={() => {
            navigation.navigate('FormScreen')
          }}
        />
        <NavigationItem
          name={'Wszyscy doktorzy'}
          iconName={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          onPress={() => {
            navigation.navigate('AllDoctorsScreen')
          }}
        />
        <NavigationItem
          name={'Konwersacje'}
          iconName={
            Platform.OS === 'android' ? 'md-chatboxes' : 'ios-chatboxes'
          }
          onPress={() => {
            navigation.navigate('ChatGroupsScreen')
          }}
        />
      </View>
    )
  }
  if (role === 'ADMIN') {
    display = (
      <View style={styles.screen}>
        <NavigationItem
          name={'Przychodnia'}
          iconName={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}
          onPress={() => {
            navigation.navigate('ClinicScreen', { role: role })
          }}
        />

        <NavigationItem
          name={'Moje konto'}
          iconName={Platform.OS === 'android' ? 'md-contact' : 'ios-contact'}
          onPress={() => {
            navigation.navigate('UserAccountScreen')
          }}
        />
        <NavigationItem
          name={'Dodaj lekarza'}
          iconName={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          onPress={() => {
            navigation.navigate('AssignDoctorAccountScreen')
          }}
        />
      </View>
    )
  }
  if (role === 'DOCTOR' && isAssignClinic) {
    display = (
      <View style={styles.screen}>
        <NavigationItem
          name={'Przychodnia'}
          iconName={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}
          onPress={() => {
            navigation.navigate('ClinicScreen', { role: role })
          }}
        />

        <NavigationItem
          name={'Moje konto'}
          iconName={Platform.OS === 'android' ? 'md-contact' : 'ios-contact'}
          onPress={() => {
            navigation.navigate('UserAccountScreen')
          }}
        />
        <NavigationItem
          name={'Konwersacje'}
          iconName={
            Platform.OS === 'android' ? 'md-chatboxes' : 'ios-chatboxes'
          }
          onPress={() => {
            navigation.navigate('ChatGroupsScreen')
          }}
        />
        <NavigationItem
          name={'Wszyscy pacjenci'}
          iconName={Platform.OS === 'android' ? 'md-list-box' : 'ios-list-box'}
          onPress={() => {
            navigation.navigate('AllPatientsScreen')
          }}
        />
      </View>
    )
  }
  return <ScrollView>{display}</ScrollView>
}
export const screenOptions = () => {
  const dispatch = useDispatch()
  return {
    headerTitle: 'Start',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title=''
          iconName={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
          onPress={() => {
            dispatch(authActions.logout())
          }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noAssignClinic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeScreen
