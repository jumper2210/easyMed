import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native'
import UserDetailsItem from '../../components/UserComponents/UserDetailsItem'
import * as usersActions from '../../store/actions/user'
import * as chatMateActions from '../../store/actions/chatMate'
import Colors from '../../constants/Colors'

const AllPatientsScreen = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()

  let display = <ActivityIndicator size='large' color={Colors.secondary} />
  const patients = useSelector((state) => state.patientsState.patients)
  // const chatMates = useSelector((state) => state.chatMatesState.chatMates)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // dispatch(usersActions.loadAllUsers())
      // dispatch(chatMateActions.loadChatMates())
    })
    return unsubscribe
  }, [navigation])

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
                dispatch()
                // chatMateActions.isMyChatMate(chatMates, itemData.item._id)
                navigation.navigate('PatientDataScreen', {
                  avatar: itemData.item.avatar,
                  // chatMates: chatMates,
                  patientName: itemData.item.name,
                  patientMail: itemData.item.email,
                  patientId: itemData.item._id,
                  patientPhoneNumber: itemData.item.phoneNumber,
                })
              }}
            />
          ) : null
        }
      />
    )
  }

  return <View style={styles.screen}>{display}</View>
}
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
})
export default AllPatientsScreen
