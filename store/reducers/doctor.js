import Doctor from '../../models/doctor';
import MedicalVisit from '../../models/medicalVisit';
import {
  LOAD_CLINIC_DOCTORS,
  LOAD_DOCTORS_MEDICAL_VISITS,
} from '../actions/doctor';

const initialState = {
  doctors: [],
  doctorMedicalVisits: [],
};

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
      };
    case LOAD_DOCTORS_MEDICAL_VISITS:
      return {
        doctorMedicalVisits: action.doctorMedicalVisits.map(
          (md) => new MedicalVisit(md._id, md.date, md.doctor, md.patient)
        ),
      };
    default:
      return state;
  }
};
