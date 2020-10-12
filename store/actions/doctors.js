export const LOAD_DOCTORS = "LOAD_DOCTORS";
export const ADD_DOCTOR = "ADD_DOCTOR";

export const loadDoctors = () => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    fetch("http://192.168.1.17:8080/doctors/getDoctors", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch Doctors");
        }
        return res.json();
      })
      .then((resData) => {
        dispatch({ type: LOAD_DOCTORS, doctors: resData.doctors });
      });
  };
};

export const addDoctor = (doctorEmail) => {
  return async (dispatch, getState) => {
    const ownEmail = getState().authState.user.email;
    fetch("http://192.168.1.17:8080/doctors/addDoctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ doctorEmail, ownEmail }),
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("Failed to add Doctor");
        }
        return res.json();
      })
      .then((response) => {
        dispatch({ type: ADD_DOCTOR, doctor: { ...response.doctor } });
      });
  };
};
