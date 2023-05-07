import { SET_CURRENT_AIR, SET_HISTORY_AIR,SET_FORECAST_AIR } from "../contexts/constants";
export const airReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_CURRENT_AIR:
            return {
                ...state,
                current: payload,
                airLoading: false,
            };
        case SET_HISTORY_AIR:
            return {
                ...state,
                history: payload,
                airLoading: false,
            };
            case SET_FORECAST_AIR:
                return {
                    ...state,
                    forecast: payload,
                    airLoading: false,
                };
        default:
            return { ...state };
    }
};
