import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Colors from '../../constants/Colors';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import { useDispatch } from 'react-redux';
import * as medicalVisitActions from '../../store/actions/medicalVisit';

const doctorsAppointmentScreen = ({ navigation, route }) => {
  const [currentDay, setCurrentDay] = useState(null);
  const { doctorId, _id } = route.params;
  const dispatch = useDispatch();
  const DISABLED_DAYS = ['Saturday', 'Sunday'];
  const onMonthChange = (date) => {
    setMarkedDates(getDaysInMonth(date.month - 1, date.year, DISABLED_DAYS));
  };

  const getDaysInMonth = (month, year, days) => {
    let pivot = moment().month(month).year(year).startOf('month');
    const end = moment().month(month).year(year).endOf('month');
    let dates = {};

    const disabled = { disabled: true };
    while (pivot.isBefore(end)) {
      days.forEach((day) => {
        dates[pivot.day(day).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }

    return dates;
  };
  const [markedDates, setMarkedDates] = useState(
    getDaysInMonth(moment().month(), moment().year(), DISABLED_DAYS)
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Wybierz termin</Text>
      <Calendar
        style={{ height: 300, width: '90%', justifyContent: 'center' }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          todayTextColor: '#57B9BB',
          dayTextColor: '#222222',
          textDisabledColor: '#d9e1e8',
          monthTextColor: '#57B9BB',
          arrowColor: '#57B9BB',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          selectedDayBackgroundColor: '#57B9BB',
          selectedDayTextColor: 'white',
          textDayHeaderFontSize: 8,
        }}
        current
        minDate={new Date()}
        maxDate={'2022-05-30'}
        onDayPress={(day) => {
          console.log('selected day', day);
          setCurrentDay(day);
        }}
        onDayLongPress={(day) => {
          console.log('selected day', day);
        }}
        monthFormat={'yyyy MMMM'}
        onMonthChange={(month) => {
          onMonthChange(month);
        }}
        hideArrows={false}
        hideExtraDays={true}
        disableMonthChange={false}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={true}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        disableAllTouchEventsForDisabledDays={true}
        markedDates={markedDates}
        enableSwipeMonths={true}
      />
      <Button
        title='Sprawdź dostępne godziny'
        onPress={() => {
          dispatch(
            medicalVisitActions.checkOfAvaibleDates(
              doctorId,
              currentDay,
              navigation,
              _id
            )
          );
        }}
      />
    </View>
  );
};

export default doctorsAppointmentScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: Colors.primary,
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
    width: '100%',
    textAlign: 'center',
    color: Colors.secondary,
  },
});
