import { intersection } from "lodash";
import {
  ADD_ANIMATION,
  INIT_ANIM_LISTENER,
  MAP_TO_NAVBAR,
  REMOVE_ANIMATION,
} from "../types";

/**
 *
 * @param {String} id - unique id of a component to be mapped to navbar
 * @param {String} name  - name to be displayed in navbar
 * @param {String} route - url of a given compoenent
 */
export const mapToNavbar = (nav) => (dispatch, getState) => {
  dispatch({
    type: MAP_TO_NAVBAR,
    payload: nav,
  });
};

export const initAnimListener = () => (dispatch, getState) => {
  let timer = 0;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          let id;
          if ((id = entry.target.id)) {
            entry.target.classList.add(getState().context.animations[id]);
            entry.target.classList.remove("hidden");
          }
        }, timer);
        timer += 50;
        observer.unobserve(entry.target);
        setTimeout(() => {
          timer = 0;
        }, 1000);
      }
    });
  });

  dispatch({
    type: INIT_ANIM_LISTENER,
    payload: observer,
  });
};

export const addAnimation = ({ ref, id, anim }) => (dispatch, getState) => {
  if (getState().context.observer) {
    getState().context.observer.observe(ref);
  }
  dispatch({
    type: ADD_ANIMATION,
    payload: { id, anim },
  });
};
export const removeAnimation = ({ id }) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ANIMATION,
    payload: { id },
  });
};
