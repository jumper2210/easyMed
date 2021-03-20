import { currentIp } from '../../helpers/currentIp';

export const CREATE_HEALTH_INFORMATION = ' CREATE_HEALTH_INFORMATION';
export const LOAD_PATIENT_HEALTH_INFORMATIONS =
  'LOAD_PATIENT_HEALTH_INFORMATIONS';

export const createHealthInformation = (imageUri, symptom, weight) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    const response = await fetch(
      `${currentIp}/healthInformation/createHealthInformation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          imageUri: imageUri,
          symptom: symptom,
          weight: weight,
        }),
      }
    );
    if (!response.ok) {
      console.log('Something went wrong');
    }
    const healthInformation = await response.json();

    dispatch({
      type: CREATE_HEALTH_INFORMATION,
      healthInformation: healthInformation,
    });
  };
};

export const loadPatientHealthInformation = (patientId) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    fetch(
      `${currentIp}/healthInformation/getPatienthealthInformations/${patientId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Nie pobrano historii medycznej');
        }
        return res.json();
      })
      .then((resData) => {
        dispatch({
          type: LOAD_PATIENT_HEALTH_INFORMATIONS,
          healthInformations: resData.healthInformations,
        });
      });
  };
};

export const checkHealthInformation = (healthInformationId, doctorNotes) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    const response = await fetch(
      `${currentIp}/healthInformation/checkPatientHealthInformation/${healthInformationId}`,
      {
        body: JSON.stringify({
          doctorNotes: doctorNotes,
        }),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );
    if (!response.ok) {
      console.log('Something went wrong');
    }
  };
};
