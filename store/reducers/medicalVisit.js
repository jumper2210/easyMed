import medicalVisit from '../../models/medicalVisit';
import { CREATE_MEDICAL_VISIT } from '../actions/doctor';

const initialState = {
  medicalVisit: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEDICAL_VISIT:
      return {
        // doctors: action.doctors.map(
        //   (dr) =>
        //     new Doctor(
        //       dr._id.toString(),
        //       dr.name,
        //       dr.email,
        //       dr.phoneNumber,
        //       dr.avatar,
        //       dr.role,
        //       dr.specialization,
        //       dr.clinics
        //     )
        // ),
      };

    default:
      return state;
  }
};
