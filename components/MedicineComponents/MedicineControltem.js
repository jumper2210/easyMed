import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Colors from '../../constants/Colors';
import constants from '../../constants/Constants';
import Button from '../../UI/Button';

const MedicineControlItem = (props) => {
  const { name, isEdited, timeOfTaking, onTriggerNotification } = props;

  let display = null;
  if (isEdited === false) {
    display = (
      <View style={styles.item}>
        <View style={styles.touchable}>
          <View style={styles.data}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>
            <View>
              <View style={styles.details}>
                <Text style={styles.description}>Przyjmowanie:</Text>
                <Text style={styles.timeOfTaking}>{timeOfTaking}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={{ backgroundColor: Colors.primary }}
            textStyle={{ color: Colors.details }}
            onPress={onTriggerNotification}
            title='Ustaw powiadomienie'
          />
        </View>
      </View>
    );
  } else {
    display = (
      <View style={styles.itemIsEdited}>
        <View style={styles.touchable}>
          <Text style={styles.infoText}>Ten lek został edytowany</Text>
          <View style={styles.data}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>
            <View>
              <View style={styles.details}>
                <ScrollView>
                  <Text style={styles.description}>Przyjmowanie:</Text>
                  <Text style={styles.timeOfTaking}>{timeOfTaking}</Text>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={{ backgroundColor: Colors.primary }}
            textStyle={{ color: Colors.details }}
            onPress={onTriggerNotification}
            title='Ustaw powiadomienie'
          />
        </View>
      </View>
    );
  }

  return <View>{display}</View>;
};

const styles = StyleSheet.create({
  item: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    marginTop: 30,
    padding: 15,
    height: constants.screenHeight / 2,
    justifyContent: 'space-evenly',
  },
  itemIsEdited: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#272121',
    marginTop: 30,
    padding: 15,
    height: constants.screenHeight / 2,
    justifyContent: 'space-evenly',
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  details: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  data: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  name: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
    marginVertical: 10,
    color: Colors.details,
    textTransform: 'uppercase',
  },
  infoText: {
    textAlign: 'center',
    paddingVertical: 13,
    color: Colors.primary,
  },
  timeOfTaking: {
    fontFamily: 'open-sans-bold',
    fontSize: 13,
    marginVertical: 2,
    color: Colors.secondary,
  },
  quantity: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2,
    color: Colors.secondary,
  },
  description: {
    fontSize: 18,
    color: Colors.secondary,
    fontFamily: 'open-sans',
    paddingBottom: 10,
  },
});

export default MedicineControlItem;
