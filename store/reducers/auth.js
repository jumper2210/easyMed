import { AUTHENTICATE, SET_DID_TRY_AL, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
  name: null,
  role: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        name: action.name,
        role: action.role,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };

    default:
      return state;
  }
};
