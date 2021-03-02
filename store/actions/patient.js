import { currentIp } from '../../helpers/currentIp';
export const LOAD_CLINIC_PATIENTS = 'LOAD_CLINIC_PATIENTS';

export const loadClinicPatients = (clinicId) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    fetch(`${currentIp}/patient/getClinicPatients/${clinicId}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Failed to fetch patients');
        }
        return response.json();
      })
      .then((resData) => {
        dispatch({
          type: LOAD_CLINIC_PATIENTS,
          patients: resData.patients,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
