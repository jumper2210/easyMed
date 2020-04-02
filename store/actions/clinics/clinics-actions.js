export const ADD_CLINIC = "ADD_CLINIC";

export const addClinic = title => {
  return { type: ADD_CLINIC, placeData: { title: title } };
};
