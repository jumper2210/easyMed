import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import Card from '../../UI/Card';

const HourItem = (props) => {
  const { hour, onSelect } = props;
  return (
    <TouchableOpacity onPress={onSelect} style={styles.container}>
      <Card style={{ height: 50 }}>
        <Text style={styles.hour}>{hour}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  hour: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
    marginHorizontal: 14,
    color: Colors.details,
    textAlign: 'center',
  },
});

export default HourItem;
