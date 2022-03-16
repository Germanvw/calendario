import { types } from "../types";

const initialState = {
  modalOpen: false,
  loading: false,
  errorMsg: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiClearError:
      return {
        ...state,
        errorMsg: null,
      };

    case types.uiSetError:
      return {
        ...state,
        errorMsg: action.payload,
      };

    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };

    case types.uiStopLoading:
      return {
        ...state,
        loading: false,
      };

    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };
    default:
      return state;
  }
};
