import { Dispatch } from "react";
import { RootState } from "../reducers";
import { ADD_ANIMATION, INIT_ANIM_LISTENER, MAP_TO_NAVBAR, REMOVE_ANIMATION } from "../types";
interface MapToNavbarAction {
    type: typeof MAP_TO_NAVBAR;
    payload: NavProps;
}
interface NavProps {
    [key: string]: {
        name: string;
        route: string;
    };
}
export declare const mapToNavbar: (nav: NavProps) => (dispatch: Dispatch<MapToNavbarAction>) => void;
export declare type ContextAction = InitAnimationListenerAction | RemoveAnimationAction | AddAnimationAction | MapToNavbarAction;
interface InitAnimationListenerAction {
    type: typeof INIT_ANIM_LISTENER;
    payload: IntersectionObserver;
}
export declare const initAnimListener: () => (dispatch: Dispatch<InitAnimationListenerAction>, getState: () => RootState) => void;
interface AddAnimationAction {
    type: typeof ADD_ANIMATION;
    payload: {
        id: string;
        anim: string;
    };
}
interface AddAnimationProps {
    ref: Element;
    id: string;
    anim: string;
}
export declare const addAnimation: ({ ref, id, anim }: AddAnimationProps) => (dispatch: Dispatch<AddAnimationAction>, getState: () => RootState) => void;
interface RemoveAnimationAction {
    type: typeof REMOVE_ANIMATION;
    payload: {
        id: string;
    };
}
export declare const removeAnimation: ({ id }: {
    id: string;
}) => (dispatch: Dispatch<RemoveAnimationAction>) => void;
export {};
