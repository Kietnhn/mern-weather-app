import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CityContext } from "../contexts/CityContext";
import { WeatherContext } from "../contexts/WeatherContext";
import { AuthContext } from "../contexts/AuthContext";
import setIconUrl from "../utils/setIconUrl";
import { DeleteIcon } from "./icons";
import setBackgroundGradient from "../utils/setBackgroundGradient";
import defaultData from "../utils/defaultCityData";

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
        if (isAuthenticated) {
            const { _id } = weather;
            await deleteCity(_id);
            setAlert(null);
        }
    };
    const CityWeather = ({ weather }) => {
        return (
            <div
                onClick={() => handleSelectCity(weather)}
                className={`w-full between overflow-hidden  rounded-2xl  
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
                            {weather?.weather?.temp}&deg;
                        </h2>
                    </>
                )}

                {isEdit && (
                    <button onClick={() => setAlert(weather)}>
                        <span>
                            <DeleteIcon />
                        </span>
                    </button>
                )}
            </div>
        );
    };
    if (!data) return <></>;
    return (
        <div
            className={`flex flex-col justify-between ${
                isCompare ? "max-h-[300px] overflow-auto" : "h-full"
            }`}
        >
            {alert && (
                <div className={`"fixed inset-0 bg-[rgba(0,0,0,.4)] z-[50]"`}>
                    <div className="bg-primaryText text-center text-dark p-6 rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h1>Remove {alert?.name} ?</h1>
                        <div className="flex items-center justify-between gap-2">
                            <button
                                className="border px-2 py-1 rounded-lg bg-transparent text-dark border-dark"
                                onClick={() => setAlert(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="border px-2 py-1 rounded-lg bg-dark text-primaryText border-dark"
                                onClick={() => handleDeleteCity(alert)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {!isAuthenticated ? (
                <div className="flex-1">
                    <div className="mb-4">
                        <h2 className="text-center mb-3">
                            Sign in to view your positions
                        </h2>
                        <NavLink
                            to="/login"
                            className="block text-center w-full border px-4 py-2 rounded-lg bg-primaryText text-dark"
                        >
                            Sign in
                        </NavLink>
                    </div>
                </div>
            ) : (
                <div className="flex-1">
                    <h3 className="font-semibold text-xl">My Positions</h3>
                    {data.length > 0 ? (
                        <div className="h-full overflow-auto">
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
                </div>
            )}
            <div>
                <h3 className="font-semibold text-xl">Famoust cities</h3>
                <div>
                    {defaultData.map((weather) => (
                        <div key={`${weather._id || weather?.weather.imgUrl}`}>
                            <CityWeather weather={weather} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CitiesWeather;
