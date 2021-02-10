import { currentIp } from '../../helpers/currentIp'

export const SET_PATIENT = 'SET_PATIENT'
export const LOAD_USER = 'LOAD_USER'

export const loadUserData = () => {
  return async (dispatch, getState) => {
    const token = getState().authState.token
    fetch(`${currentIp}/user/getUser`, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch User data')
        }
        return res.json()
      })

      .then((resData) => {
        dispatch({ type: LOAD_USER, selfUser: resData.user })
      })
  }
}

export const loadAllUsers = () => {
  return async (dispatch, getState) => {
    const token = getState().authState.token
    fetch(`${currentIp}/user/getAllUsers`, {
      headers: { Authorization: 'Barer ' + token },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch Users')
        }
        return res.json()
      })
      .then((resData) => {
        dispatch({ type: SET_PATIENT, patients: resData.users })
      })
  }
}

export const editUser = (name, phoneNumber, selectedImage) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token
    fetch(`${currentIp}/user/editUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        phoneNumber,
        name,
        selectedImage,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error('Failed to edit user data')
      }
      return res.json()
    })
  }
}
