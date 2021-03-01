import Patient from '../../models/patient'
import { LOAD_CLINIC_PATIENTS } from '../actions/user'

const initialState = {
  patients: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLINIC_PATIENTS:
      return {
        patients: action.patients.map(
          (pt) =>
            new Patient(
              pt._id.toString(),
              pt.name,
              pt.medicalCases,
              pt.email,
              pt.phoneNumber,
              pt.avatar,
              pt.role,
              pt.clinics,
              pt.isAssignClinic
            )
        ),
      }
    default:
      return state
  }
}
