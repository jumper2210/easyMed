import User from "../../models/user";
import { LOAD_USER, SET_PATIENT } from "../actions/user";

const initialState = {
  users: [],
  selfUser: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        selfUser: action.selfUser,
      };
    case SET_PATIENT:
      return {
        users: action.patients.map(
          (pt) =>
            new User(
              pt._id.toString(),
              pt.name,
              pt.medicalCases,
              pt.email,
              pt.phoneNumber,
              pt.avatar,
              pt.role
            )
        ),
      };
    default:
      return state;
  }
};
