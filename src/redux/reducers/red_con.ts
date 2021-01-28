import { ADD_ANIMATION, INIT_ANIM_LISTENER, MAP_TO_NAVBAR } from "../types";

import { ContextAction } from "../actions/act_con";

const initialState: ContextState = {
  nav: {},
  animations: {},
};

export interface ContextState {
  nav: NavProps;
  observer?: IntersectionObserver;
  animations: { [key: string]: string };
}

export interface NavProps {
  [key: string]: {
    name: string;
    route: string;
  };
}

export default function (state = initialState, action: ContextAction) {
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
