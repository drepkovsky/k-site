import { Dispatch } from "react";
import { RootState } from "../reducers";
import {
  ADD_ANIMATION,
  INIT_ANIM_LISTENER,
  REMOVE_ANIMATION,
} from "../types";


export interface NavProps {
  [key: string]: {
    name: string;
    route: string;
  };
}

export type ContextAction =
  | InitAnimationListenerAction
  | RemoveAnimationAction
  | AddAnimationAction;

export interface InitAnimationListenerAction {
  type: typeof INIT_ANIM_LISTENER;
  payload: IntersectionObserver;
}

export const initAnimListener = () => (
  dispatch: Dispatch<InitAnimationListenerAction>,
  getState: () => RootState
) => {
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

export interface AddAnimationAction {
  type: typeof ADD_ANIMATION;
  payload: { id: string; anim: string };
}

export interface AddAnimationProps {
  ref: Element;
  id: string;
  anim: string;
}

export const addAnimation = ({ ref, id, anim }: AddAnimationProps) => (
  dispatch: Dispatch<AddAnimationAction>,
  getState: () => RootState
) => {
  getState().context.observer?.observe(ref);
  dispatch({
    type: ADD_ANIMATION,
    payload: { id, anim },
  });
};

export interface RemoveAnimationAction {
  type: typeof REMOVE_ANIMATION;
  payload: { id: string };
}

export const removeAnimation = ({ id }: { id: string }) => (
  dispatch: Dispatch<RemoveAnimationAction>
) => {
  dispatch({
    type: REMOVE_ANIMATION,
    payload: { id },
  });
};
