import { SET_NAVBAR_LINKS, SET_NAVBAR_HEIGHT } from "../types";

export const setNavbarLinks = (navLinks) => (dispatch, getState) => {
  dispatch({
    type: SET_NAVBAR_LINKS,
    payload: navLinks,
  });
};

export const setNavbarHeight = (height) => (dispatch, getState) => {
  dispatch({
    type: SET_NAVBAR_HEIGHT,
    payload: height,
  });
};
