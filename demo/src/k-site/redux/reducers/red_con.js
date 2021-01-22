import { ADD_ANIMATION, INIT_ANIM_LISTENER, MAP_TO_NAVBAR } from "../types";

const initialState = {
  nav: {},
  navbarHeight: 0,
  currentTheme: "default",
  observer: null,
  animations: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MAP_TO_NAVBAR:
      return {
        ...state,
        nav: action.payload,
      };
    case INIT_ANIM_LISTENER: {
      return {
        ...state,
        observer: action.payload,
      };
    }
    case ADD_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          [action.payload.id]: action.payload.anim,
        },
      };
    default:
      return state;
  }
}
