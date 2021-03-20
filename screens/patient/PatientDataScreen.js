import React, { useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HealthInformationItem from '../../components/HealthInformationComponents/HealthInformationItem';
import Colors from '../../constants/Colors';
import * as conversationActions from '../../store/actions/conversation';
import * as chatMateActions from '../../store/actions/chatMate';
import * as healthInformationActions from '../../store/actions/healthInformation';
import * as userAction from '../../store/actions/user';
import HealthInformation from '../../models/healthInformation';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import constants from '../../constants/Constants';
import UserAvatarItem from '../../components/UserComponents/UserAvatarItem';
import ListOfMedicines from '../../components/MedicineComponents/ListOfMedicnes';

const PatientDataScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    patientName,
    patientMail,
    patientPhoneNumber,
    patientId,
    avatar,
  } = route.params;
  const selfUser = useSelector((state) => state.usersState.selfUser);
  const chatMates = useSelector((state) => state.chatMatesState.chatMates);

  const healthInformations = useSelector(
    (state) => state.healthInformationState.healthInformations
  );
  const conversations = useSelector(
    (state) => state.conversationsState.conversations
  );

  let healthInformationsToCheck = [];
  let buttonDisplay;
  let healthInformationDisplay;

  useEffect(() => {
    dispatch(healthInformationActions.loadPatientHealthInformation(patientId));
    dispatch(conversationActions.loadConversationsPatients());
    dispatch(userAction.loadUserData());
    dispatch(chatMateActions.loadChatMates());
  }, []);

  const setCurrentConversationId = (conversationId) => {
    dispatch(conversationActions.setCurrentConversation(conversationId));
  };

  const findConversationHandler = (patientId) => {
    const findConversation = conversations.find(
      (conversation) => conversation.chatMateId === patientId
    );
    return findConversation;
  };

  buttonDisplay = (
    <Button
      style={{ backgroundColor: Colors.primary }}
      textStyle={{ color: Colors.details }}
      title='Napisz wiadomość'
      onPress={() => {
        const conversation = findConversationHandler(patientId);

        if (conversation && conversation.id) {
          setCurrentConversationId(conversation.id);
          navigation.navigate('ConversationScreen', {
            conversation: conversation,
            chatMates: chatMates,
            user: selfUser,
          });
        } else {
          dispatch(
            conversationActions.createConversationPatient(
              patientId,
              navigation,
              selfUser
            )
          );
        }
      }}
    />
  );

  healthInformations.map((mc) => {
    if (mc.resolved === false) {
      healthInformationsToCheck.push(
        new HealthInformation(
          mc._id.toString(),
          mc.name,
          mc.symptom,
          mc.weight,
          mc.doctorNotes,
          mc.createdAt,
          mc.imageUri,
          mc.resolved
        )
      );
      return healthInformationsToCheck;
    }
  });

  if (healthInformationsToCheck.length > 0) {
    healthInformationDisplay = (
      <View>
        <Text style={styles.healthInformationInfo}>
          Zobacz szczegóły dolegliwości tego pacjenta
        </Text>
        <FlatList
          horizontal
          data={healthInformationsToCheck}
          keyExtractor={(item) => item._id}
          renderItem={(itemData) => (
            <HealthInformationItem
              createdAt={itemData.item.createdAt}
              onPress={() => {
                navigation.navigate('HealthInformationDetailsScreen', {
                  name: patientName,
                  healthInformationId: itemData.item._id,
                  symptom: itemData.item.symptom,
                  weight: itemData.item.weight,
                  doctorNotes: itemData.item.doctorNotes,
                  createdAt: itemData.item.createdAt,
                  imageUri: itemData.item.imageUri,
                  role: 'DOCTOR',
                });
              }}
            />
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.patientDataCard}>
        <UserAvatarItem avatar={avatar} role={'PATIENT'} />
        <View style={styles.details}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.label}>{patientMail}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Numer telefonu:</Text>
          <Text style={styles.label}>
            {patientPhoneNumber && patientPhoneNumber.length > 0
              ? patientPhoneNumber
              : 'Brak danych'}
          </Text>
        </View>
      </Card>
      <View style={styles.scrollViewStyled}>{healthInformationDisplay}</View>
      <Text style={styles.medicineInfo}>Lekarstwa: </Text>
      <View style={{ height: 100, width: '70%' }}>
        <ListOfMedicines patientId={patientId} navigation={navigation} />
      </View>

      <View style={styles.buttonContainer}>
        {buttonDisplay}
        <Button
          style={{ backgroundColor: Colors.primary }}
          textStyle={{ color: Colors.details }}
          title='Przypisz lekarstwo'
          onPress={() => {
            navigation.navigate('AssignMedicineScreen', {
              patientId: patientId,
              patientName: patientName,
            });
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  patientDataCard: {
    borderRadius: 10,
    width: constants.screenWidth - 40,
    height: constants.screenHeight / 2 - 140,
    justifyContent: 'space-around',
  },
  scrollViewStyled: {
    height: 200,
  },
  details: {
    flexDirection: 'row',
    paddingLeft: 10,
    flexWrap: 'wrap',
  },
  avatar: {
    height: 80,
    width: 100,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
  },
  label: {
    color: Colors.details,
    fontFamily: 'open-sans-bold',
    fontSize: 14,
    textAlign: 'center',
    paddingLeft: 10,
  },
  noHealthInformationInfo: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
    fontSize: 10,
    textTransform: 'uppercase',
    marginTop: 40,
  },
  data: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  medicineInfo: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    color: Colors.primary,
    textAlign: 'center',
    marginVertical: 10,
  },
  healthInformationInfo: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const screenOptions = (navData) => {
  const patientName = navData.route.params.patientName;
  return {
    title: patientName,
    headerTintColor: Colors.primary,
    headerStyle: { backgroundColor: Colors.secondary },
  };
};

export default PatientDataScreen;
