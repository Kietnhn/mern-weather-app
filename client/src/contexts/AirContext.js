import { createContext, useReducer } from "react";
import { airReducer } from "../reducers/airReducer";
import { apiUrl } from "./constants";
import axios from "axios";
import {
    SET_CURRENT_AIR,
    SET_HISTORY_AIR,
    SET_FORECAST_AIR,
} from "./constants";

export const AirContext = createContext();
const AirContextProvider = ({ children }) => {
    const [airState, dispatch] = useReducer(airReducer, {
        airLoading: false,
        current: null,
        history: null,
        forecase: null,
    });

    const getCurrentAirPollution = async ({ lat, lon }) => {
        const response = await axios(`${apiUrl}/air`, {
            params: {
                lat,
                lon,
            },
        }).then((res) => res.data);
        dispatch({ type: SET_CURRENT_AIR, payload: response.data });
    };
    const getForecastAirPollution = async ({ lat, lon }) => {
        const response = await axios(`${apiUrl}/air/forecast`, {
            params: {
                lat,
                lon,
            },
        }).then((res) => res.data);
        dispatch({ type: SET_FORECAST_AIR, payload: response.data });
    };
    const getHistoryAirPollution = async ({ lat, lon, start, end }) => {
        const response = await axios(`${apiUrl}/air/history`, {
            params: {
                lat,
                lon,
                start,
                end,
            },
        }).then((res) => res.data);
        dispatch({ type: SET_HISTORY_AIR, payload: response.data });
    };

    const airContextData = {
        airState,
        getCurrentAirPollution,
        getHistoryAirPollution,
        getForecastAirPollution,
    };
    return (
        <AirContext.Provider value={airContextData}>
            {children}
        </AirContext.Provider>
    );
};
export default AirContextProvider;
