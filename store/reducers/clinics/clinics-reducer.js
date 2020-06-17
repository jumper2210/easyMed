import { ADD_CLINIC, SET_CLINIC } from "../../actions/clinics/clinics-actions";
import Clinic from "../../../models/clinic";

const initialState = {
  clinics: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CLINIC:
      return {
        clinics: action.clinics.map(
          (cl) =>
            new Clinic(
              cl._id.toString(),
              cl.title,
              cl.imageUri,
              cl.address,
              cl.lat,
              cl.lng
            )
        ),
      };

    case ADD_CLINIC:
      const newClinic = new Clinic(
        action.clinic._id,
        action.clinic.title,
        action.clinic.imageUri,
        action.clinic.address,
        action.clinic.lat,
        action.clinic.lng
      );
      return {
        clinics: state.clinics.concat(newClinic),
      };
    default:
      return state;
  }
};
