import React from "react";
import { SaveIcon, UnsaveIcon } from "../icons";
import { WeatherContext } from "../../contexts/WeatherContext";
import { useContext, useState } from "react";
import { CityContext } from "../../contexts/CityContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToolTip } from "../../components";
import { SettingsContext } from "../../contexts/SettingsContext";
import useDetectUserDevice from "../../hooks/useDetectUserDevice";
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
    const {
        settingsState: { globalAlert },
        setGlobalAlert,
        toggleModalLogin,
    } = useContext(SettingsContext);
    const [isMobile] = useDetectUserDevice();
    const [savedCity, setSavedCity] = useState(false);
    const navigate = useNavigate();
    const handleSaveCity = () => {
        if (!isAuthenticated) {
            if (isMobile) {
                return navigate("/login");
            } else {
                return toggleModalLogin(true);
            }
        }
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
        const response = await deleteCity(existedCity._id);
        if (response?.success) {
            setSavedCity(false);
        }
        console.log({ response });

        setGlobalAlert({ type: response.success, content: response.message });
        setTimeout(() => {
            setGlobalAlert(null);
        }, [3000]);
    };
    const saveCity = async () => {
        const { lat, lon } = weatherData;

        const response = await addCity({ lat, lon });

        if (response?.success) {
            setSavedCity(true);
        }
        console.log({ response });
        setGlobalAlert({ type: response.success, content: response.message });
        setTimeout(() => {
            setGlobalAlert(null);
        }, [3000]);
    };
    useEffect(() => {
        const { lat, lon } = weatherData;
        const existedCity = cities?.find(
            (city) => city?.lat === `${lat}` && city?.lon === `${lon}`
        );
        setSavedCity(existedCity ? true : false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cities, weatherData]);
    useEffect(() => {
        console.log({ globalAlert });
    }, [globalAlert]);
    return (
        <>
            <ToolTip
                message="Add to love list"
                position="top-[calc(100%+12px)] left-1/2 -translate-x-1/2"
                arrow="-top-2 -translate-y-1/2 left-1/2 -translate-x-1/2 
                border-[transparent_transparent_white_transparent] dark:border-[transparent_transparent_black_transparent]"
            >
                <button className="" onClick={handleSaveCity}>
                    <span>
                        {savedCity ? (
                            <SaveIcon width="22px" height="22px" />
                        ) : (
                            <UnsaveIcon width="22px" height="22px" />
                        )}
                    </span>
                </button>
            </ToolTip>
        </>
    );
};

export default SaveButton;
