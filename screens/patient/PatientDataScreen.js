import React, { useEffect } from "react"
import { View, StyleSheet, Text, FlatList, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import MedicalCaseItem from "../../components/MedicalCaseComponents/MedicalCaseItem"
import Colors from "../../constants/Colors"
import * as conversationActions from "../../store/actions/conversation"
import * as chatMateActions from "../../store/actions/chatMate"
import * as medicalCaseActions from "../../store/actions/medicalCase"
import * as userAction from "../../store/actions/user"
import MedicalCase from "../../models/medicalCase"
import Button from "../../UI/Button"
import Card from "../../UI/Card"
import constants from "../../constants/Constants"
import UserAvatarItem from "../../components/UserComponents/UserAvatarItem"
import ListOfMedicines from "../../components/MedicineComponents/ListOfMedicnes"

const PatientDataScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const {
    patientName,
    patientMail,
    patientPhoneNumber,
    patientId,
    chatMates,
    avatar,
  } = route.params
  const selfUser = useSelector((state) => state.usersState.selfUser)

  const medicalCases = useSelector(
    (state) => state.medicalCaseState.medicalCases
  )
  const conversations = useSelector(
    (state) => state.conversationsState.conversations
  )
  const isChatMateExist = useSelector(
    (state) => state.chatMatesState.isChatMateExist
  )
  let medicalCasesToCheck = []

  let medicalCaseDisplay = (
    <Text style={styles.noMedicalCaseInfo}>
      This paction has not any medical case yet.
    </Text>
  )
  let buttonDisplay = (
    <Button
      style={{ backgroundColor: Colors.primary }}
      textStyle={{ color: Colors.details }}
      title={"Add chat mate"}
      onPress={() => {
        dispatch(chatMateActions.addChatMate(patientMail))
        infoHandler()
      }}
    />
  )

  useEffect(() => {
    dispatch(medicalCaseActions.loadPatientMedicalCase(patientId))
    dispatch(conversationActions.loadConversations())
    dispatch(userAction.loadUserData())
    dispatch(chatMateActions.loadChatMates())
  }, [])

  const setCurrentConversationId = (conversationId) => {
    dispatch(conversationActions.setCurrentConversation(conversationId))
  }

  const findConversationHandler = (patientId) => {
    const findConversation = conversations.find(
      (conversation) => conversation.chatMateId === patientId
    )
    return findConversation
  }

  const infoHandler = () => {
    Alert.alert(
      "Talk with your chat mate",
      "Now you can write to your chat mate",
      [
        {
          text: "add this patient to your chat mates",
          onPress: () => {
            navigation.navigate("ChatGroupsScreen")
          },
        },
      ]
    )
  }

  if (isChatMateExist) {
    if (isChatMateExist == true) {
      buttonDisplay = (
        <Button
          style={{ backgroundColor: Colors.primary }}
          textStyle={{ color: Colors.details }}
          title="Write a message"
          onPress={() => {
            const conversation = findConversationHandler(patientId)
            if (conversation && conversation.id) {
              setCurrentConversationId(conversation.id)
              navigation.navigate("ConversationScreen", {
                conversation: conversation,
                chatMates: chatMates,
                user: selfUser,
              })
            } else {
              dispatch(
                conversationActions.createConversation(patientId, navigation)
              )
            }
          }}
        />
      )
    }
  }

  medicalCases.map((mc) => {
    if (mc.resolved === false) {
      medicalCasesToCheck.push(
        new MedicalCase(
          mc._id.toString(),
          mc.name,
          mc.age,
          mc.increase,
          mc.locationOfPain,
          mc.otherSymptom,
          mc.pickedSymptom,
          mc.radiance,
          mc.scale,
          mc.createdAt,
          mc.imageUri,
          mc.resolved
        )
      )
      return medicalCasesToCheck
    }
  })

  if (medicalCasesToCheck.length > 0) {
    medicalCaseDisplay = (
      <View>
        <Text style={styles.medicalCaseInfo}>Check medical case</Text>
        <FlatList
          horizontal
          data={medicalCasesToCheck}
          keyExtractor={(item) => item._id}
          renderItem={(itemData) => (
            <MedicalCaseItem
              createdAt={itemData.item.createdAt}
              onPress={() => {
                navigation.navigate("MedicalCaseDetailsScreen", {
                  name: patientName,
                  medicalCaseId: itemData.item._id,
                  age: itemData.item.age,
                  increase: itemData.item.increase,
                  locationOfPain: itemData.item.locationOfPain,
                  otherSymptom: itemData.item.otherSymptom,
                  pickedSymptom: itemData.item.pickedSymptom,
                  radiance: itemData.item.radiance,
                  scale: itemData.item.scale,
                  createdAt: itemData.item.createdAt,
                  imageUri: itemData.item.imageUri,
                  role: "DOCTOR",
                })
              }}
            />
          )}
        />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.patientDataCard}>
        <UserAvatarItem avatar={avatar} role={"PATIENT"} />
        <View style={styles.details}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.label}>{patientMail}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Phone number:</Text>
          <Text style={styles.label}>
            {patientPhoneNumber && patientPhoneNumber.length > 0
              ? patientPhoneNumber
              : "no data"}
          </Text>
        </View>
      </Card>
      <View style={styles.scrollViewStyled}>{medicalCaseDisplay}</View>
      <View style={{ height: 100, width: "70%" }}>
        <ListOfMedicines patientId={patientId} />
      </View>

      <View style={styles.buttonContainer}>
        {buttonDisplay}
        <Button
          style={{ backgroundColor: Colors.primary }}
          textStyle={{ color: Colors.details }}
          title="Assign medicines"
          onPress={() => {
            navigation.navigate("AssignMedicineScreen", {
              patientId: patientId,
              patientName: patientName,
            })
          }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  patientDataCard: {
    borderRadius: 10,
    width: constants.screenWidth - 60,
    height: constants.screenHeight / 2 - 110,
    justifyContent: "space-around",
  },
  scrollViewStyled: {
    height: 150,
  },
  details: {
    flexDirection: "row",
    paddingLeft: 10,
    flexWrap: "wrap",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
  },
  label: {
    color: Colors.details,
    fontFamily: "open-sans-bold",
    fontSize: 14,
    textAlign: "center",
    paddingLeft: 10,
  },
  noMedicalCaseInfo: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
    fontSize: 10,
    textTransform: "uppercase",
    marginTop: 40,
  },
  data: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  medicalCaseInfo: {
    fontFamily: "open-sans",
    fontSize: 15,
    color: Colors.primary,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})

export const screenOptions = (navData) => {
  const patientName = navData.route.params.patientName
  return {
    title: patientName,
    headerTintColor: Colors.primary,
    headerStyle: { backgroundColor: Colors.secondary },
  }
}

export default PatientDataScreen
