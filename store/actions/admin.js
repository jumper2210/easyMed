export const setDoctorRole = (userId) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token
    fetch(`http://192.168.1.17:8080/admin/setDoctorRole/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("Something goes wrong")
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
