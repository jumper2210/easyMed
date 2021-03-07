import { currentIp } from '../../helpers/currentIp';
export const CREATE_MEDICAL_VISIT = 'CREATE_MEDICAL_VISIT';
import { arrayOfAvaibleHours } from '../../helpers/arrayOfAvaibleHours';

export const createMedicalVisit = (day, doctorId, hour) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    fetch(`${currentIp}/medicalVisit/createMedicalVisit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ day, doctorId, hour }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Failed to create Medical Visit');
        }
        return response.json();
      })
      .then((resData) => {})
      .catch((err) => {
        console.log(err);
      });
  };
};

export const checkOfAvaibleDates = (doctorId, day, navigation, _id) => {
  return async (dispatch, getState) => {
    let busyHours = [];
    const token = getState().authState.token;
    const { dateString } = day;
    fetch(
      `${currentIp}/medicalVisit/checkOfDeadlines/${doctorId}/${dateString}`,
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Failed to check deadlines');
        }
        return response.json();
      })
      .then((resData) => {
        let busyHours = resData.deadlines;
        let avaibleHours = [];
        if (busyHours.length == 0) {
          return;
        }
        if (busyHours.length > 0) {
          arrayOfAvaibleHours.map((ao) => {
            for (let i of busyHours) {
              if (ao.hour !== i) avaibleHours.push(ao.hour);
            }
          });
        }
        console.log(avaibleHours);
      })
      .catch((err) => {
        console.log(err);
      });
    navigation.navigate('AvaibleHoursScreen', {
      doctorId: doctorId,
      day: day,
      _id: _id,
    });
  };
};
