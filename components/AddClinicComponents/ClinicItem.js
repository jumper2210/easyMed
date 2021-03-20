import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import constants from '../../constants/Constants';
import { FontAwesome5 } from '@expo/vector-icons';

const ClinicItem = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onSelect}
      style={styles.placeItem}
    >
      {/* <Image style={styles.image} source={{ uri: props.image }} /> */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <FontAwesome5 name='clinic-medical' size={65} color='black' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    paddingTop: 75,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: constants.screenWidth - 70,
    height: constants.screenHeight - 340,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    borderColor: Colors.secondary,
    borderWidth: 1,
  },
  infoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 39,
    paddingVertical: 10,
  },
  title: {
    color: Colors.secondary,
    fontSize: 18,
    fontFamily: 'open-sans-bold',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
});

export default ClinicItem;
