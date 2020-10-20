export const CREATE_MEDICAL_CASE = "CREATE_MEDICAL_CASE";
export const LOAD_USER_MEDICAL_CASES = "LOAD_USER_MEDICAL_CASES";
export const createMedicalCase = (
  imageUri,
  pickedSymptom,
  otherSymptom,
  age,
  scale,
  increase,
  locationOfPain,
  radiance
) => {
  return async (dispatch, getState) => {
    const token = getState().authState.token;
    const response = await fetch(
      "http://192.168.1.17:8080/medicalCase/createMedicalCase",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          imageUri: imageUri,
          pickedSymptom: pickedSymptom,
          otherSymptom: otherSymptom,
          age: age,
          scale: scale,
          increase: increase,
          locationOfPain: locationOfPain,
          radiance: radiance,
        }),
      }
    );
    if (!response.ok) {
      console.log("Something went wrong");
    }
    const medicalCase = await response.json();

    dispatch({ type: CREATE_MEDICAL_CASE, medicalCase: medicalCase });
  };
};

export const loadUserMedicalCase = (patientId) => {
  return async (dispatch) => {
    fetch(
      `http://192.168.1.17:8080/medicalCase/getUserMedicalCases/${patientId}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch Medical Case");
        }
        return res.json();
      })
      .then((resData) => {
        dispatch({
          type: LOAD_USER_MEDICAL_CASES,
          medicalCases: resData.medicalCases,
        });
      });
  };
};
