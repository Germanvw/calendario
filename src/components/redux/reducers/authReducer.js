const { types } = require("../types");

const initialState = {
  validating: true,
  // uid:null,
  // name:null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        validating: false,
      };
    case types.authFinishValidating:
      return {
        ...state,
        validating: false,
      };

    case types.authLogout:
      return {
        validating: false,
      };
    default:
      return state;
  }
};
