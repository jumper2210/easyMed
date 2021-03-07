import { currentIp } from '../../helpers/currentIp';
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
          throw new Error('Failed to fetch doctors');
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
