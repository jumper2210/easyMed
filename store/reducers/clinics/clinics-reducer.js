import { ADD_CLINIC, SET_CLINIC } from "../../actions/clinics/clinics-actions";
import Clinic from "../../../models/clinic";

const initialState = {
  clinics: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CLINIC:
      return {
        clinics: action.clinics.map(
          cl => new Clinic(cl.id.toString(), cl.title, cl.imageUri)
        )
      };
    case ADD_CLINIC:
      const newClinic = new Clinic(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image
      );
      return {
        clinics: state.clinics.concat(newClinic)
      };
    default:
      return state;
  }
};
