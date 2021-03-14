import Patient from '../../models/patient';
import MedicalVisit from '../../models/medicalVisit';
import {
  LOAD_CLINIC_PATIENTS,
  LOAD_PATIENTS_MEDICAL_VISITS,
} from '../actions/patient';

const initialState = {
  patients: [],
  patientMedicalVisits: [],
};

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
      };
    case LOAD_PATIENTS_MEDICAL_VISITS:
      return {
        patientMedicalVisits: action.patientMedicalVisits.map(
          (md) =>
            new MedicalVisit(md._id, md.date, md.hour, md.doctor, md.patient)
        ),
      };
    default:
      return state;
  }
};
