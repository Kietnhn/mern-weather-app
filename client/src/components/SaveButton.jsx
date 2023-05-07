import React from "react";
import { SaveIcon, UnsaveIcon } from "./icons";
import { WeatherContext } from "../contexts/WeatherContext";
import { useContext, useState } from "react";
import { CityContext } from "../contexts/CityContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const SaveButton = () => {
    const {
        weatherState: { weatherData },
    } = useContext(WeatherContext);
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    const {
        cityState: { cities },
        addCity,
        deleteCity,
    } = useContext(CityContext);

    const [savedCity, setSavedCity] = useState(false);
    const navigate = useNavigate();
    const handleSaveCity = () => {
        console.log("clicked");
        console.log({ cities });
        if (!isAuthenticated) return navigate("/login");
        if (savedCity) {
            unSaveCity();
        } else {
            saveCity();
        }
    };
    const unSaveCity = async () => {
        const { lat, lon } = weatherData;

        const existedCity = cities?.find(
            (city) => city.lat === `${lat}` && city.lon === `${lon}`
        );
        console.log(existedCity);
        const response = await deleteCity(existedCity._id);
        if (response.success) {
            setSavedCity(false);
        }
    };
    const saveCity = async () => {
        const { lat, lon } = weatherData;

        const response = await addCity({ lat, lon });
        console.log(response);
        if (response.success) {
            setSavedCity(true);
        }
    };
    useEffect(() => {
        const { lat, lon } = weatherData;
        const existedCity = cities?.find(
            (city) => city?.lat === `${lat}` && city?.lon === `${lon}`
        );
        setSavedCity(existedCity ? true : false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cities, weatherData]);
    return (
        <>
            <button className="" onClick={handleSaveCity}>
                <span>
                    {savedCity ? (
                        <SaveIcon width="22px" height="22px" />
                    ) : (
                        <UnsaveIcon width="22px" height="22px" />
                    )}
                </span>
            </button>
        </>
    );
};

export default SaveButton;
