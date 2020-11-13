import {
  CREATE_MEDICAL_CASE,
  LOAD_PATIENT_MEDICAL_CASES,
} from "../actions/medicalCase"

const initialState = {
  medicalCases: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEDICAL_CASE:
      return {
        medicalCases: [{ ...state }, action.medicalCase],
      }
    case LOAD_PATIENT_MEDICAL_CASES:
      return {
        medicalCases: action.medicalCases,
      }
    default:
      return state
  }
}
