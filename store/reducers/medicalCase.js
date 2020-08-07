import { CREATE_MEDICAL_CASE } from "../actions/medicalCase";

const initialState = {
  medicalCases: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEDICAL_CASE:
      return {
        medicalCases: action.medicalCase,
      };
    default:
      return state;
  }
};
