import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../UI/CustomHeaderButton'
import NavigationItem from '../components/NavigationItem'
import { ScrollView } from 'react-native-gesture-handler'
import * as authActions from '../store/actions/auth'
import RegisterForPushNotifications from '../helpers/registerForPushNotifications'
const HomeScreen = ({ navigation }) => {
  const userRole = useSelector((state) => state.authState.role)
  let display = null

  useEffect(() => {
    if (userRole === 'DOCTOR') {
      RegisterForPushNotifications()
    }
  }, [userRole])

  if (userRole === 'PATIENT') {
    display = (
      <View style={styles.screen}>
        <NavigationItem
          name={'Przychodnia'}
          iconName={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}
          onPress={() => {
            navigation.navigate('ClinicScreen', { userRole: userRole })
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
  if (userRole === 'ADMIN') {
    display = (
      <View style={styles.screen}>
        <NavigationItem
          name={'Przychodnia'}
          iconName={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}
          onPress={() => {
            navigation.navigate('ClinicScreen', { userRole: userRole })
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
          name={'Użytkownicy'}
          iconName={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          onPress={() => {
            navigation.navigate('SetDoctorRoleScreen')
          }}
        />
      </View>
    )
  }
  if (userRole === 'DOCTOR') {
    display = (
      <View style={styles.screen}>
        <NavigationItem
          name={'Przychodnia'}
          iconName={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}
          onPress={() => {
            navigation.navigate('ClinicScreen', { userRole: userRole })
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
})

export default HomeScreen
