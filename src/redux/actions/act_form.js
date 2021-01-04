import { SET_FORM_VALUE } from "../types";

export const setFormValue = (formId, name, value) => (dispatch, getState) => {
    if (formId)
        dispatch({
            type: SET_FORM_VALUE,
            payload: { formId, name, value },
        });
};
