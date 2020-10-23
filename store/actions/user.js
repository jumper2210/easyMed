export const SET_PATIENT = "SET_PATIENT";
export const LOAD_USER = "LOAD_USER";

export const loadUserData = () => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    fetch("http://192.168.1.17:8080/user/getUser", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch User data");
        }
        return res.json();
      })

      .then((resData) => {
        dispatch({ type: LOAD_USER, selfUser: resData.user });
      });
  };
};

export const loadAllPatients = () => {
  return async (dispatch) => {
    fetch("http://192.168.1.17:8080/user/getAllUsers")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch Patients");
        }
        return res.json();
      })
      .then((resData) => {
        dispatch({ type: SET_PATIENT, patients: resData.users });
      });
  };
};
