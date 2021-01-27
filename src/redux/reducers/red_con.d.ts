import { ContextAction } from "../actions/act_con";
export interface ContextState {
    nav: NavProps;
    observer?: IntersectionObserver;
    animations: {
        [key: string]: string;
    };
}
interface NavProps {
    [key: string]: {
        name: string;
        route: string;
    };
}
export default function (state: ContextState | undefined, action: ContextAction): ContextState;
export {};
