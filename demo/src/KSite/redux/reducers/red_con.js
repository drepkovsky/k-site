import { SET_NAVBAR_HEIGHT, SET_NAVBAR_LINKS } from "../types";

const initialState = {
  navLinks: [],
  navbarHeight: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NAVBAR_LINKS:
      return {
        ...state,
        navLinks: action.payload,
      };
    case SET_NAVBAR_HEIGHT:
      return {
        ...state,
        navbarHeight: action.payload,
      };

    default:
      return state;
  }
}
