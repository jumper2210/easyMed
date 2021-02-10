import { currentIp } from '../../helpers/currentIp'

export const SET_PATIENT_MEDICINES = 'SET_PATIENT_MEDICINES'
export const ASSIGN_MEDICINE = 'ASSIGN_MEDICINE'

export const assignMedicine = (
  medicineName,
  quantity,
  timeOfTaking,
  patientId
) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token
    fetch(`${currentIp}/medicine/assignMedicine/${patientId}`, {
      method: 'POST',
      body: JSON.stringify({
        medicineName: medicineName,
        quantity: quantity,
        timeOfTaking: timeOfTaking,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error('Failed to assign medical')
        }
        return res.json()
      })
      .then((resData) => {
        dispatch({ type: ASSIGN_MEDICINE, medicine: resData.medicine })
      })
  }
}

export const loadPatientMedicines = (patientId) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token
    fetch(`${currentIp}/medicine/loadPatientMedicines/${patientId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error('Failed to fetch patient medicines')
        }
        return res.json()
      })
      .then((resData) => {
        dispatch({
          type: SET_PATIENT_MEDICINES,
          medicines: resData.medicines,
        })
      })
  }
}

export const deleteMedicine = (medicineId) => {
  console.log(medicineId)
  return async (dispatch, getState) => {
    const token = getState().authState.token
    fetch(`${currentIp}/medicine/deleteMedicine/${medicineId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error('Failed to delete medicine')
      }
      return res.json()
    })
  }
}
