import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native'
import UserDetailsItem from '../../components/UserComponents/UserDetailsItem'
import * as usersActions from '../../store/actions/user'
import * as chatMateActions from '../../store/actions/chatMate'
import Colors from '../../constants/Colors'

const AllDoctorsScreen = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()
  const chatMates = useSelector((state) => state.chatMatesState.chatMates)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(usersActions.loadAllUsers())
      dispatch(chatMateActions.loadChatMates())
    })
    return unsubscribe
  }, [navigation])

  const doctors = useSelector((state) => state.usersState.users)
  let display = <ActivityIndicator size='large' color={Colors.secondary} />

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
              onPress={() => {
                dispatch(
                  chatMateActions.isMyChatMate(chatMates, itemData.item._id)
                )
                navigation.navigate('DoctorDataScreen', {
                  avatar: itemData.item.avatar,
                  doctorName: itemData.item.name,
                  doctorMail: itemData.item.email,
                  doctorId: itemData.item._id,
                  doctorPhoneNumber: itemData.item.phoneNumber,
                  role: itemData.item.role,
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
export default AllDoctorsScreen
