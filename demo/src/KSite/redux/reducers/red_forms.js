import { SET_FORM_VALUE } from "../types";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FORM_VALUE:
            return {
                ...state,
                [action.payload.formId]: {
                    ...state[action.payload.formId],
                    [action.payload.name]: action.payload.value,
                },
            };
        default:
            return state;
    }
}
