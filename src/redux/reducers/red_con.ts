import { ADD_ANIMATION, INIT_ANIM_LISTENER } from "../types";

import { ContextAction } from "../actions/act_con";

const initialState: ContextState = {
  animations: {},
};

export interface ContextState {
  observer?: IntersectionObserver;
  animations: { [key: string]: string };
}


const context = (state = initialState, action: ContextAction) => {
  switch (action.type) {
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
export default context;
