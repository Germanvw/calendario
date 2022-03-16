import { types } from "../types";

const initialState = {
  events: [],
  active: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventActive:
      return {
        ...state,
        active: action.payload,
      };
    case types.eventNoActive:
      return {
        ...state,
        active: null,
      };
    case types.eventCreate:
      return {
        ...state,
        events: [...state.events, action.payload],
        active: null,
      };
    case types.eventDelete:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
        active: null,
      };
    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
        active: null,
      };

    case types.eventFetchAll:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
};
