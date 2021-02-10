import ENV from '../../env'
import { currentIp } from '../../helpers/currentIp'

export const ADD_CLINIC = 'ADD_CLINIC'
export const SET_CLINIC = 'SET_CLINIC'

export const addClinic = (title, imageUri, location) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    )

    if (!response.ok) {
      throw new Error('something went wrong!')
    }

    const cnvAddress = await response.json()
    const address = cnvAddress.results[0].formatted_address

    let method = 'POST'
    let url = `${currentIp}/clinicFeed/createClinic`

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        title: title,
        imageUri: imageUri,
        address: address,
        lng: location.lng,
        lat: location.lat,
      }),
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error('Failed to create Clinic')
        }
        return res.json()
      })
      .then((resData) => {
        dispatch({
          type: ADD_CLINIC,
          clinic: {
            _id: resData.clinic._id,
            title: resData.clinic.title,
            imageUri: resData.clinic.imageUri,
            address: address,
            lat: location.lat,
            lng: location.lng,
          },
        })
      })
  }
}
export const loadClinics = () => {
  return async (dispatch, getState) => {
    const token = getState().authState.token
    fetch(`${currentIp}/clinicFeed/getClinics`, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch Clinic')
        }
        return res.json()
      })
      .then((resData) => {
        dispatch({ type: SET_CLINIC, clinics: resData.clinics })
      })
  }
}
