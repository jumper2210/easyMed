import {
  CREATE_HEALTH_INFORMATION,
  LOAD_PATIENT_HEALTH_INFORMATIONS,
} from '../actions/healthInformation';

const initialState = {
  healthInformations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_HEALTH_INFORMATION:
      return {
        healthInformations: [{ ...state }, action.healthInformation],
      };
    case LOAD_PATIENT_HEALTH_INFORMATIONS:
      return {
        healthInformations: action.healthInformations,
      };
    default:
      return state;
  }
};
