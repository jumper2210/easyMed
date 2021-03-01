import Doctor from '../../models/doctor'
import { LOAD_CLINIC_DOCTORS } from '../actions/doctor'

const initialState = {
  doctors: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLINIC_DOCTORS:
      return {
        doctors: action.doctors.map(
          (dr) =>
            new Doctor(
              dr._id.toString(),
              dr.name,
              dr.email,
              dr.phoneNumber,
              dr.avatar,
              dr.role,
              dr.specialization,
              dr.clinics
            )
        ),
      }

    default:
      return state
  }
}
