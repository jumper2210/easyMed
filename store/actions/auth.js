import { AsyncStorage } from 'react-native'
import { currentIp } from '../../helpers/currentIp'

export const AUTHENTICATE = 'AUTHENTICATE'
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL'
export const LOGOUT = 'LOGOUT'
export const GET_NAME = 'GET_NAME'
export const GET_USER = 'GET_USER'
let timer

export const authenticate = (userId, token, name, expireTime, role) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expireTime))
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      name: name,
      role: role,
    })
  }
}
export const setDidTryAl = () => {
  return { type: SET_DID_TRY_AL }
}

export const signup = (email, password, name) => {
  return async (dispatch) => {
    const response = await fetch(`${currentIp}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
    if (!response.ok) {
      let message = 'Something went wrong!'
      throw new Error(message)
    }

    const resData = await response.json()

    dispatch(
      authenticate(
        resData.userId._id,
        resData.token,
        resData.userId._name,
        resData.expireTime,
        resData.role
      )
    )
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expireTime) * 1000
    )
    saveDataToStorage(resData.token, resData.userId, expirationDate)
  }
}

export const login = (email, password, name) => {
  return async (dispatch) => {
    const response = await fetch(`${currentIp}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })

    const resData = await response.json()
    if (resData.message) {
      const errorMessage = resData.message

      throw new Error(errorMessage)
    }

    dispatch(
      authenticate(
        resData.userId,
        resData.token,
        resData.name,
        resData.expireTime,
        resData.role
      )
    )

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expireTime) * 1000
    )

    saveDataToStorage(resData.token, resData.userId, expirationDate)
  }
}
export const logout = () => {
  clearLogoutTimer()
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  )
}
