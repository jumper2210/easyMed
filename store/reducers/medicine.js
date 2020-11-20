import { SET_PATIENT_MEDICINES, ASSIGN_MEDICINE } from "../actions/medicine"
import Medicine from "../../models/medicine"

const initialState = {
  medicines: [],
}

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
      }
    case ASSIGN_MEDICINE:
      const newMedicine = new Medicine(
        action.medicine._id,
        action.medicine.name,
        action.medicine.quantity,
        action.medicine.timeOfTaking
      )
      return {
        medicines: state.medicines.concat(newMedicine),
      }
    default:
      return state
  }
}
