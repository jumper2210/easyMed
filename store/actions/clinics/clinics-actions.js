import * as FileSystem from "expo-file-system";
import { insertClinic, fetchClinics } from "../../../helpers/db";
export const ADD_CLINIC = "ADD_CLINIC";
export const SET_CLINIC = "SET_CLINIC";

export const addClinic = (title, image) => {
  return async dispatch => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertClinic(
        title,
        newPath,
        "Dummy address",
        15.6,
        12.3
      );
      dispatch({
        type: ADD_CLINIC,
        placeData: { id: dbResult.insertId, title: title, image: newPath }
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadClinics = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchClinics();
      dispatch({ type: SET_CLINIC, clinics: dbResult.rows._array });
    } catch (err) {
      throw err;
    }

    dispatch;
  };
};
