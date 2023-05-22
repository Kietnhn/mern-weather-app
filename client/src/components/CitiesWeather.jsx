import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CityContext } from "../contexts/CityContext";
import { WeatherContext } from "../contexts/WeatherContext";
import { AuthContext } from "../contexts/AuthContext";
import { SettingsContext } from "../contexts/SettingsContext";
import setIconUrl from "../utils/setIconUrl";
import { DeleteIcon } from "./icons";
import setBackgroundGradient from "../utils/setBackgroundGradient";
import defaultData from "../utils/defaultCityData";
import convertCelsiusToFahrenheit from "../utils/convertCelsiusToFahrenheit";
import ToolTip from "./ToolTip";

const CitiesWeather = ({ isEdit, className }) => {
    const {
        cityState: { cities },
        deleteCity,
    } = useContext(CityContext);
    const {
        getCompareWeatherData,
        getWeatherData,
        weatherState: { isCompare, compare },
    } = useContext(WeatherContext);
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    const {
        settingsState: { units },
        toggleModalLogin,
        setGlobalAlert,
    } = useContext(SettingsContext);
    const [alert, setAlert] = useState(null);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (isAuthenticated && cities) {
            setData(cities);
        }
    }, [cities, isAuthenticated]);
    const handleAddCompare = async ({ lat, lon }) => {
        const existedCity = compare.find(
            (city) => city.lat === lat && city.lon === lon
        );
        if (!existedCity) {
            await getCompareWeatherData({ lat, lon });
        }
    };
    const handleSelectCity = async (weather) => {
        const { lat, lon } = weather;
        if (isCompare) {
            await handleAddCompare({ lat, lon });
        } else {
            await getWeatherData({ lat, lon });
        }
    };
    const handleDeleteCity = async (weather) => {
        const { _id } = weather;
        const response = await deleteCity(_id);
        if (response?.success) {
            setAlert(null);
        }
        handleSetGlobalAlert(response);
    };
    const handleSetGlobalAlert = (response) => {
        setGlobalAlert({
            type: response.success ? "success" : "",
            content: response.message,
        });
        setTimeout(() => {
            setGlobalAlert(null);
        }, [3000]);
    };
    const handleShowAlert = (e, weather) => {
        e.stopPropagation();
        setAlert(weather);
    };
    const CityWeather = ({ weather, isDefault = false }) => {
        return (
            <div
                onClick={() => handleSelectCity(weather)}
                className={`w-full between   rounded-2xl  
                        ${
                            weather?.weather.imgUrl
                                ? "bg-image "
                                : setBackgroundGradient(weather?.weather?.icon)
                        } theme mb-2 hover:cursor-pointer px-3 min-h-[48px]`}
                style={{
                    backgroundImage: `${
                        weather?.weather.imgUrl
                            ? `url(${weather.weather?.imgUrl})`
                            : " "
                    }`,
                }}
            >
                <span className=" max-w-[100px] overflow-hidden ">
                    <h2 className="font-semibold capitalize text-xl drop-shadow-md whitespace-nowrap hover:-translate-x-1/2 duration-[2s]">
                        {weather?.weather?.name}
                    </h2>
                </span>
                {weather?.weather?.temp && (
                    <>
                        <div>
                            <img
                                className="w-10 h-10"
                                src={setIconUrl(weather?.weather?.icon)}
                                alt={weather?.weather?.description}
                            />
                        </div>
                        <h2 className="text-xl">
                            {convertCelsiusToFahrenheit(
                                weather?.weather?.temp,
                                units !== "metric"
                            )}
                            &deg;
                        </h2>
                    </>
                )}

                {!isDefault && isEdit && (
                    <ToolTip
                        message={`Delete ${weather?.weather?.name}`}
                        position="top-1/2 -left-2 -translate-y-1/2 -translate-x-full"
                        arrow="top-1/2 -translate-y-1/2 right-[1px] translate-x-full border-[8px] border-[transparent_transparent_transparent_white] dark:border-[transparent_transparent_transparent_black]"
                        customMessage="whitespace-nowrap text-sm px-2 py-1"
                    >
                        <button
                            className="p-2 pr-0"
                            onClick={(e) => handleShowAlert(e, weather)}
                        >
                            <span>
                                <DeleteIcon width="16px" height="16px" />
                            </span>
                        </button>
                    </ToolTip>
                )}
            </div>
        );
    };
    return (
        <div
            className={`flex flex-col ${
                isCompare ? "max-h-[300px] overflow-auto" : "h-full"
            }`}
        >
            {!isAuthenticated ? (
                <div className={`max-h-[calc(100%-320px)]`}>
                    <div className="my-4">
                        <h2 className="text-center mb-3">
                            Sign in to view your positions
                        </h2>
                        <NavLink
                            to="/login"
                            className="block text-center w-full border px-4 py-2 rounded-lg bg-primaryText text-dark xl:hidden"
                        >
                            Sign in
                        </NavLink>
                        <button
                            onClick={() => toggleModalLogin(true)}
                            className="button w-full hidden xl:block"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            ) : (
                <div className="max-h-[calc(100%-320px)] relative">
                    <h3 className="font-semibold text-xl mb-3">My Positions</h3>
                    {data.length > 0 ? (
                        <div className="max-h-[calc(100%-40px)]  overflow-auto">
                            {data.map((weather) => (
                                <div
                                    key={`${
                                        weather._id || weather?.weather.imgUrl
                                    }`}
                                >
                                    <CityWeather weather={weather} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <h2>Add new position</h2>
                        </div>
                    )}
                    {alert && (
                        <div
                            className={`absolute inset-0 modal-content z-[999999]`}
                        >
                            <div className="theme text-center p-6 rounded-2xl absolute-center">
                                <h1 className="text-sm font-semibold mb-4">
                                    Remove {alert.weather.name} ?
                                </h1>
                                <div className="flex items-center justify-between gap-2">
                                    <button
                                        className="button"
                                        onClick={() => setAlert(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="button-reverse"
                                        onClick={() => handleDeleteCity(alert)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div>
                <h3 className="font-semibold text-xl mb-3">Famoust cities</h3>
                <div>
                    {defaultData.map((weather) => (
                        <div key={`${weather._id || weather?.weather.imgUrl}`}>
                            <CityWeather weather={weather} isDefault={true} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CitiesWeather;
