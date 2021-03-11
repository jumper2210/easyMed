import { currentIp } from '../../helpers/currentIp';
export const LOAD_CLINIC_PATIENTS = 'LOAD_CLINIC_PATIENTS';
export const LOAD_PATIENTS_MEDICAL_VISITS = 'LOAD_PATIENTS_MEDICAL_VISITS';

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

export const loadPatientMedicalVisits = () => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;

    fetch(`${currentIp}/patient/getPatientMedicalVisits`, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Nie pobrano wizyt');
        }
        return response.json();
      })
      .then((resData) => {
        dispatch({
          type: LOAD_PATIENTS_MEDICAL_VISITS,
          patientMedicalVisits: resData.patientMedicalVisits,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
