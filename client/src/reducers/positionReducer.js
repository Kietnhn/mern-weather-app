import {
    SET_CURRENT_POSIITON,
    SET_POSITIONS,
    SET_AREA_ON_MAP,
} from "../contexts/constants";

export const positionReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_AREA_ON_MAP:
            return {
                ...state,
                areaOnMap: payload,
            };
        case SET_POSITIONS:
            return {
                ...state,
                positions: payload,
                isLoading: false,
            };
        case SET_CURRENT_POSIITON:
            return {
                ...state,
                currentPosition: payload,
                isLoading: false,
            };
        default:
            return state;
    }
};
