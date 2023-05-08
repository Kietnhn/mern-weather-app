import { createContext, useReducer } from "react";
import { weatherReducer } from "../reducers/weatherReducer";
import axios from "axios";
import {
    SET_WEATHER_DATA,
    SET_LOADING,
    SET_UNIT,
    SET_IS_USE_ANIMATE_BACKGROUND,
    apiUrl,
    SET_DATA_CHART,
    SET_IS_COMPARE,
    SET_COMPARE,
    ADD_COMPARE,
    SET_IS_SELECTED_COMPARE,
    SET_HISTORY_WEATHER,
    SET_SUN_DATA,
} from "./constants";
import getTodayHourlyWeatherData from "../utils/getTodayHourlyWeatherData";
export const WeatherContext = createContext();
const WeatherContextProvider = ({ children }) => {
    const [weatherState, dispatch] = useReducer(weatherReducer, {
        weatherData: {},
        historyWeather: {
            history1_day: null,
            history3_day: null,
            history5_day: null,
            history7_day: null,
        },
        forecastWeather: [],
        toggleTheme: false,
        isLoading: false,
        unit: "C",
        isUseAnimateBackground: false,
        dataChart: "temp",
        isCompare: false,
        isSelectedCompare: false,
        compare: [],
        sunData: null,
    });
    const getCompareWeatherData = async ({ lat, lon }) => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true,
            });
            const data = await axios
                .get(`${apiUrl}/weather`, {
                    params: {
                        lat,
                        lon,
                    },
                })
                .then((res) => {
                    const dataResponse = res.data.weather;
                    const { timezone, current, hourly, daily, lat, lon } =
                        dataResponse;
                    const hourlyWeather = getTodayHourlyWeatherData(
                        hourly,
                        timezone
                    );

                    return {
                        timezone,
                        currentWeather: current,
                        hourlyWeather,
                        weeklyWeather: daily,
                        lat,
                        lon,
                    };
                });
            dispatch({
                type: ADD_COMPARE,
                payload: data,
            });
        } catch (e) {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });
            console.log(e);
        }
    };
    const getCurrentWeatherData = async ({ lat, lon }) => {
        try {
            const data = await axios
                .get(`${apiUrl}/weather/only-current`, {
                    params: {
                        lat,
                        lon,
                    },
                })
                .then((res) => {
                    const dataResponse = res.data.data;

                    const { timezone, current, lat, lon } = dataResponse;

                    return {
                        timezone,
                        currentWeather: current,
                        lat,
                        lon,
                    };
                });

            return data;
        } catch (error) {
            console.error(error);
        }
    };
    const getWeatherData = async ({ lat, lon }) => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true,
            });

            const data = await axios
                .get(`${apiUrl}/weather`, {
                    params: {
                        lat,
                        lon,
                    },
                })
                .then((res) => {
                    const dataResponse = res.data.weather;

                    const {
                        timezone,
                        current,
                        hourly,
                        minutely,
                        daily,
                        lat,
                        lon,
                    } = dataResponse;

                    const hourlyWeather = getTodayHourlyWeatherData(
                        hourly,
                        timezone
                    );
                    return {
                        timezone,
                        currentWeather: current,
                        hourlyWeather,
                        minutelyWeather: minutely,
                        weeklyWeather: daily,
                        lat,
                        lon,
                    };
                });

            dispatch({
                type: SET_WEATHER_DATA,
                payload: data,
            });
            return data;
        } catch (error) {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });
            console.error(error);
        }
    };

    const getHistoryWeather2_5 = async ({
        lat,
        lon,
        dt,
        timezone,
        datetime,
    }) => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true,
            });
            const response = await axios(`${apiUrl}/weather/history/2.5`, {
                params: {
                    lat,
                    lon,
                    dt,
                },
            }).then((res) => res.data);
            if (response.success) {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                return getTodayHourlyWeatherData(
                    response.weather,
                    timezone,
                    datetime
                );
            }
        } catch (error) {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });
            console.error(error);
        }
    };

    const getHistoryWeather = async ({
        lat,
        lon,
        start,
        end,
        type = "temperature_2m,relativehumidity_2m,surface_pressure,windspeed_10m",
    }) => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true,
            });
            const history = await axios
                .get(`${apiUrl}/weather/history`, {
                    params: {
                        lat,
                        lon,
                        start,
                        end,
                        type,
                    },
                })
                .then((res) => res.data);
            const customHistory = {
                hourly: {
                    time: history.data.hourly.time,
                    temp: history.data.hourly.temperature_2m,
                    humidity: history.data.hourly.relativehumidity_2m,
                    pressure: history.data.hourly.surface_pressure,
                    windspeed: history.data.hourly.windspeed_10m,
                },
            };
            dispatch({ type: SET_HISTORY_WEATHER, payload: customHistory });
        } catch (error) {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });
            console.error(error);
        }
    };

    const getSunData = async ({ lat, lon, date = "today", timezone }) => {
        try {
            const response = await axios(`${apiUrl}/sun`, {
                params: {
                    lat,
                    lon,
                    date,
                    timezone,
                },
            }).then((res) => res.data);
            dispatch({ type: SET_SUN_DATA, payload: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    const setHistoryWeather = (payload) => {
        dispatch({ type: SET_HISTORY_WEATHER, payload });
    };
    const setIsCompare = (payload) => {
        dispatch({ type: SET_IS_COMPARE, payload });
    };
    const setIsSelectedCompare = (payload) => {
        dispatch({ type: SET_IS_SELECTED_COMPARE, payload });
    };
    const setCompare = (payload) => {
        dispatch({ type: SET_COMPARE, payload });
    };
    const addCompare = (payload) => {
        dispatch({ type: ADD_COMPARE, payload });
    };
    const setDataChart = (payload) => {
        dispatch({ type: SET_DATA_CHART, payload });
    };
    const setIsUseAnimateBackground = (payload) => {
        dispatch({ type: SET_IS_USE_ANIMATE_BACKGROUND, payload });
    };
    const setUnitTemp = (payload) => {
        dispatch({ type: SET_UNIT, payload });
    };
    const weatherContextData = {
        getWeatherData,
        getCompareWeatherData,
        getHistoryWeather2_5,
        getHistoryWeather,
        getCurrentWeatherData,
        getSunData,
        weatherState,
        setUnitTemp,
        setIsUseAnimateBackground,
        setDataChart,
        setIsCompare,
        setCompare,
        addCompare,
        setIsSelectedCompare,
        setHistoryWeather,
    };
    return (
        <WeatherContext.Provider value={weatherContextData}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherContextProvider;
