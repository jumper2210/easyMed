import { ADD_CLINIC } from "../../actions/clinics/clinics-actions";
import Clinic from "../../../models/clinic";

const initialState = {
  clinics: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLINIC:
      const newClinic = new Clinic(
        new Date().toString(),
        action.placeData.title
      );
      return {
        clinics: state.clinics.concat(newClinic)
      };
    default:
      return state;
  }
};
