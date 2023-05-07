import {
    SET_WEATHER_DATA,
    SET_LOADING,
    TOGGLE_THEME,
    SET_FORECAST_WEATHER,
    SET_UNIT,
    SET_IS_USE_ANIMATE_BACKGROUND,
    SET_DATA_CHART,
    SET_IS_COMPARE,
    SET_COMPARE,
    ADD_COMPARE,
    SET_IS_SELECTED_COMPARE,
    SET_HISTORY_WEATHER,
    SET_SUN_DATA,
} from "../contexts/constants";
export const weatherReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_SUN_DATA:
            return {
                ...state,
                sunData: payload,
            };
        case SET_HISTORY_WEATHER:
            return { ...state, historyWeather: payload, isLoading: false };
        case ADD_COMPARE:
            return {
                ...state,
                compare: [...state.compare, payload],
                isLoading: false,
            };
        case SET_COMPARE:
            return {
                ...state,
                compare: payload,
                isLoading: false,
            };
        case SET_IS_SELECTED_COMPARE:
            return {
                ...state,
                isSelectedCompare: payload,
            };
        case SET_IS_COMPARE:
            return {
                ...state,
                isCompare: payload,
            };
        case SET_DATA_CHART:
            return {
                ...state,
                dataChart: payload,
            };
        case SET_IS_USE_ANIMATE_BACKGROUND:
            return {
                ...state,
                isUseAnimateBackground: payload,
            };
        case TOGGLE_THEME:
            return {
                ...state,
                toggleTheme: payload,
            };

        case SET_WEATHER_DATA:
            return {
                ...state,
                weatherData: payload,
                isLoading: false,
                compare: [{ ...payload }],
            };
        case SET_FORECAST_WEATHER:
            return {
                ...state,
                forecastWeather: payload,
                isLoading: false,
            };
        case SET_UNIT:
            return {
                ...state,
                unit: payload,
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: payload,
            };

        default:
            return state;
    }
};
