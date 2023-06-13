export const TOGGLE_THEME = "TOGGLE_THEME";

// auth
export const SET_AUTH = "SET_AUTH";
export const SET_AUTH_POSITION = "SET_AUTH_POSITION";
// weather
export const SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER";
export const SET_WEATHER_DATA = "SET_WEATHER_DATA";
export const SET_FORECAST_WEATHER = "SET_FORECAST_WEATHER";
export const SET_HISTORY_WEATHER = "SET_HISTORY_WEATHER";

// setting
export const SET_UNITS = "SET_UNITS";
export const IS_SHOW_MODAL_LOGIN = "IS_SHOW_MODAL_LOGIN";
export const IS_SHOW_MODAL_UPDATE_PROFILE = "IS_SHOW_MODAL_UPDATE_PROFILE";
export const SET_LOADING = "SET_LOADING";
export const SET_IS_USE_ANIMATE_BACKGROUND = "SET_IS_USE_ANIMATE_BACKGROUND";
export const SET_GLOBAL_ALERT = "SET_GLOBAL_ALERT";
// compare
export const SET_DATA_CHART = "SET_DATA_CHART";
export const SET_IS_SELECTED_COMPARE = "SET_IS_SELECTED_COMPARE";
export const SET_IS_COMPARE = "SET_IS_COMPARE";
export const SET_COMPARE = "SET_COMPARE";
export const ADD_COMPARE = "ADD_COMPARE";

// sun
export const SET_SUN_DATA = "SET_SUN_DATA";
// position
export const SET_POSITIONS = "SET_POSITIONS";
export const SET_AREA_ON_MAP = "SET_AREA_ON_MAP";
export const SET_CURRENT_POSIITON = "SET_CURRENT_POSIITON";

// air
export const SET_CURRENT_AIR = "SET_CURRENT_AIR";
export const SET_HISTORY_AIR = "SET_HISTORY_AIR";
export const SET_FORECAST_AIR = "SET_FORECAST_AIR";

//system
export const apiUrl =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api"
        : "https://sheltered-island-57187.herokuapp.com/api";
export const LOCAL_STORAGE_TOKEN_NAME = "weather";
