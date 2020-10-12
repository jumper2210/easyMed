import Doctor from "../../models/doctor";
import { ADD_DOCTOR, LOAD_DOCTORS } from "../actions/doctors";

const initialState = {
  doctors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DOCTOR: {
      return {
        doctors: [
          {
            ...state.doctors,
            ...action.doctor,
          },
        ],
      };
    }
    case LOAD_DOCTORS: {
      return {
        doctors: action.doctors.map(
          (dr) => new Doctor(dr._id.toString(), dr.name)
        ),
      };
    }
    default: {
      return state;
    }
  }
};
