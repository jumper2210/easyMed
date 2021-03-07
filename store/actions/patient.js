import { currentIp } from '../../helpers/currentIp';
export const LOAD_CLINIC_PATIENTS = 'LOAD_CLINIC_PATIENTS';

export const loadClinicPatients = (clinicId, _id) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    let clinicPatientssArr = [];
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
        resData.patients.map((pt) => {
          for (let i of pt.clinics) {
            if (i == clinicId) {
              clinicPatientssArr.push(pt);
            }
          }
          return clinicPatientssArr;
        });
        dispatch({
          type: LOAD_CLINIC_PATIENTS,
          patients: clinicPatientssArr,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
