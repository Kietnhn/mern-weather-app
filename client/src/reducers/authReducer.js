import { SET_AUTH, SET_AUTH_POSITION } from "../contexts/constants";

export const authReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                authLoading: false,
                isAuthenticated: payload.isAuthenticated,
                user: payload.user,
            };
        case SET_AUTH_POSITION:
            return {
                ...state,
                user: {
                    ...state.user,
                    position: payload,
                },
            };
        default:
            return state;
    }
};
