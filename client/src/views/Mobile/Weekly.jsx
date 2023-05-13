import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import { set2xIconUrl } from "../../utils/setIconUrl";
import moment from "moment-timezone";
import convertCelsiusToFahrenheit from "../../utils/convertCelsiusToFahrenheit";
import { SettingsContext } from "../../contexts/SettingsContext";

const Weekly = () => {
    const {
        weatherState: {
            weatherData: { weeklyWeather, timezone },
        },
    } = useContext(WeatherContext);
    const {
        settingsState: { units },
    } = useContext(SettingsContext);
    const renderMinMax = (type) => {
        return (
            <>
                {convertCelsiusToFahrenheit(
                    weeklyWeather[0]?.temp[type],
                    units !== "metric"
                )}
                &deg;
            </>
        );
    };
    return (
        <div className="my-2">
            {weeklyWeather.length > 0 &&
                weeklyWeather.map((weather, index) => (
                    <div
                        key={weather?.dt + index}
                        className="w-full flex justify-between items-center"
                    >
                        <p className="w-[90px]">
                            {index === 0
                                ? "Today"
                                : moment
                                      .unix(weather.dt)
                                      .tz(timezone)
                                      .format("dddd")}
                        </p>
                        <div className="flex items-center">
                            <div className="w-[42px] h-[42px]">
                                <img
                                    alt="weather-s-icon"
                                    src={set2xIconUrl(weather.weather[0]?.icon)}
                                    className="w-full h-full onject-cover"
                                />
                            </div>
                            <div className="w-[86px] overflow-hidden relative">
                                <p
                                    className={`whitespace-nowrap animate-loadText text-center`}
                                    style={{
                                        animationDelay: `${index * 500}ms`,
                                    }}
                                >
                                    {weeklyWeather[0].weather[0].description}
                                </p>
                            </div>
                        </div>
                        <p className="font-semibold text-base  ">
                            {renderMinMax("max")}/{renderMinMax("min")}
                        </p>
                    </div>
                ))}
        </div>
    );
};

export default Weekly;
