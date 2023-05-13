import {
    IS_SHOW_MODAL_LOGIN,
    SET_GLOBAL_ALERT,
    SET_UNITS,
} from "../contexts/constants";

export const settingsReducer = (state, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action;
    switch (type) {
        case SET_UNITS:
            return {
                ...state,
                units: payload,
            };
        case IS_SHOW_MODAL_LOGIN:
            return {
                ...state,
                isShowModalLogin: payload,
            };
        case SET_GLOBAL_ALERT:
            return {
                ...state,
                globalAlert: payload,
            };
        default:
            return state;
    }
};
