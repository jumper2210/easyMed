import { currentIp } from '../../helpers/currentIp'
export const LOAD_CLINIC_DOCTORS = 'LOAD_CLINIC_DOCTORS'

export const loadClinicDoctors = (clinicId) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token
    fetch(`${currentIp}/doctor/getClinicDoctors/${clinicId}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Failed to fetch doctors')
        }
        return response.json()
      })
      .then((resData) => {
        dispatch({
          type: LOAD_CLINIC_DOCTORS,
          doctors: resData.doctors,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
