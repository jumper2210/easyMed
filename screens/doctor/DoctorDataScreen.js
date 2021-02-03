import React, { useEffect } from "react"
import { View, StyleSheet, Text, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Colors from "../../constants/Colors"
import Button from "../../UI/Button"
import * as conversationActions from "../../store/actions/conversation"
import * as chatMateActions from "../../store/actions/chatMate"
import * as userAction from "../../store/actions/user"
import constants from "../../constants/Constants"
import Card from "../../UI/Card"
import UserAvatarItem from "../../components/UserComponents/UserAvatarItem"

const DoctorDataScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const chatMates = useSelector((state) => state.chatMatesState.chatMates)
  const selfUser = useSelector((state) => state.usersState.selfUser)
  const conversations = useSelector(
    (state) => state.conversationsState.conversations
  )
  const isChatMateExist = useSelector(
    (state) => state.chatMatesState.isChatMateExist
  )

  const setCurrentConversationId = (conversationId) => {
    dispatch(conversationActions.setCurrentConversation(conversationId))
  }
  const { doctorMail, doctorPhoneNumber, doctorId, avatar } = route.params

  const infoHandler = () => {
    Alert.alert("Chcesz dodać tego pacjenta do listy znajomych?", "", [
      {
        text: "dodaj",
        onPress: () => {
          navigation.navigate("ChatGroupsScreen")
        },
      },
    ])
  }
  useEffect(() => {
    dispatch(conversationActions.loadConversations())
    dispatch(chatMateActions.loadChatMates())
    dispatch(userAction.loadUserData())
  }, [dispatch])

  const findConversationHandler = (patientId) => {
    const findConversation = conversations.find(
      (conversation) => conversation.chatMateId === patientId
    )
    return findConversation
  }

  let buttonDisplay = (
    <Button
      title={"Add chat mate"}
      style={{ backgroundColor: Colors.primary }}
      textStyle={{ color: Colors.details }}
      onPress={() => {
        dispatch(chatMateActions.addChatMate(doctorMail))
        infoHandler()
      }}
    />
  )

  if (isChatMateExist) {
    if (isChatMateExist == true) {
      buttonDisplay = (
        <Button
          style={{ backgroundColor: Colors.primary }}
          textStyle={{ color: Colors.details }}
          title="Napisz wiadomość"
          onPress={() => {
            const conversation = findConversationHandler(doctorId)
            if (conversation && conversation.id) {
              setCurrentConversationId(conversation.id)
              navigation.navigate("ConversationScreen", {
                conversation: conversation,
                chatMates: chatMates,
                user: selfUser,
              })
            } else {
              dispatch(
                conversationActions.createConversation(doctorId, navigation)
              )
            }
          }}
        />
      )
    }
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.doctorDataCard}>
        <UserAvatarItem avatar={avatar} role={"DOCTOR"} />
        <View style={styles.details}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.label}>{doctorMail}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Numer telefonu:</Text>
          <Text style={styles.label}>
            {doctorPhoneNumber && doctorPhoneNumber.length > 0
              ? doctorPhoneNumber
              : "no data"}
          </Text>
        </View>
      </Card>
      {buttonDisplay}
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },

  avatar: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
  },
  data: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  details: {
    flexDirection: "row",
    paddingLeft: 10,
    flexWrap: "wrap",
  },
  doctorDataCard: {
    borderRadius: 10,
    width: constants.screenWidth - 40,
    height: constants.screenHeight / 2 - 90,
    justifyContent: "space-around",
  },
  label: {
    color: Colors.details,
    fontFamily: "open-sans-bold",
    fontSize: 14,
    textAlign: "center",
    paddingLeft: 10,
  },
})

export const screenOptions = (navData) => {
  return {
    title: navData.route.params.doctorName,
    headerTintColor: Colors.primary,
    headerStyle: { backgroundColor: Colors.secondary },
  }
}

export default DoctorDataScreen
