export const CREATE_MEDICAL_CASE = "CREATE_MEDICAL_CASE";

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
  return async (dispatch) => {
    const response = await fetch(
      "http://192.168.1.17:8080/medicalCase/createMedicalCase",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
