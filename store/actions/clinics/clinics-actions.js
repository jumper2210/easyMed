import * as FileSystem from "expo-file-system";
import { insertClinic, fetchClinics } from "../../../helpers/db";
import ENV from "../../../env";

export const ADD_CLINIC = "ADD_CLINIC";
export const SET_CLINIC = "SET_CLINIC";

export const addClinic = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("something went wrong!");
    }

    const restData = await response.json();

    if (!restData.results) {
      throw new Error("something went wrong!");
    }
    const address = restData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertClinic(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_CLINIC,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadClinics = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchClinics();
      dispatch({ type: SET_CLINIC, clinics: dbResult.rows._array });
    } catch (err) {
      throw err;
    }

    dispatch;
  };
};
