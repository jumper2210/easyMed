import { SET_PATIENT_MEDICINES, ASSIGN_MEDICINE } from "../actions/medicine";
import Medicine from "../../models/medicine";

const initialState = {
  medicines: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PATIENT_MEDICINES:
      return {
        medicines: action.medicines.map(
          (md) =>
            new Medicine(
              md._id.toString(),
              md.name,
              md.quantity,
              md.timeOfTaking
            )
        ),
      };
    case ASSIGN_MEDICINE:
      return {
        medicines: [{ ...state }, action.medicine],
      };
    default:
      return state;
  }
};
