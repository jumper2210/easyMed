import { currentIp } from '../../helpers/currentIp'

export const AssignDoctorAccount = (
  email,
  password,
  name,
  specialization,
  clinicId
) => {
  return async (dispatch, getState) => {
    fetch(`${currentIp}/admin/AssignDoctor/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        specialization: specialization,
        clinicId: clinicId,
      }),
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error('Something goes wrong')
        }
        return res.json()
      })
      .then((resData) => {
        console.log(resData)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
