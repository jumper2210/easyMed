import Patient from "../../models/patient";
import { LOAD_USER, SET_PATIENT } from "../actions/user";

const initialState = {
  patients: [],
  selfUser: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        selfUser: action.selfUser,
      };
    case SET_PATIENT:
      return {
        patients: action.patients.map(
          (pt) =>
            new Patient(
              pt._id.toString(),
              pt.name,
              pt.medicalCases,
              pt.email,
              pt.phoneNumber,
              pt.avatar
            )
        ),
      };
    default:
      return state;
  }
};
