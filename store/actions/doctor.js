import { currentIp } from '../../helpers/currentIp';
export const LOAD_DOCTORS_MEDICAL_DOCTORS = 'LOAD_DOCTORS_MEDICAL_DOCTORS';
export const LOAD_CLINIC_DOCTORS = 'LOAD_CLINIC_DOCTORS';

export const loadClinicDoctors = (clinicId, _id) => {
  return async (dispatch, getState) => {
    let clinicDoctorsArr = [];
    const token = getState().authState.token;
    fetch(`${currentIp}/doctor/getClinicDoctors/${clinicId}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Nie pobrano lekarzy');
        }
        return response.json();
      })
      .then((resData) => {
        resData.doctors.map((dr) => {
          for (let i of dr.clinics) {
            if (i == clinicId) {
              clinicDoctorsArr.push(dr);
            }
          }
          return clinicDoctorsArr;
        });

        dispatch({
          type: LOAD_CLINIC_DOCTORS,
          doctors: clinicDoctorsArr,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const loadDoctorMedicalVisits = () => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;

    fetch(`${currentIp}/doctor/getDoctorMedicalVisits`, {
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
          type: LOAD_DOCTORS_MEDICAL_DOCTORS,
          doctorMedicalVisits: resData.doctorMedicalVisits,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
