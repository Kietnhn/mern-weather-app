import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import moment from "moment-timezone";
import { set2xIconUrl } from "../../utils/setIconUrl";
import convertCelsiusToFahrenheit from "../../utils/convertCelsiusToFahrenheit";
import { SettingsContext } from "../../contexts/SettingsContext";

const Hourly = () => {
    const {
        weatherState: {
            weatherData: { timezone, hourlyWeather },
        },
    } = useContext(WeatherContext);
    const {
        settingsState: { units },
    } = useContext(SettingsContext);
    const renderTemp = (weather) => {
        const temp = convertCelsiusToFahrenheit(
            weather?.temp ? weather?.temp : weather?.main?.temp,
            units !== "metric"
        );

        return Number(temp).toFixed(0);
    };
    return (
        <div className="flex w-full overflow-auto -mx-1  pb-2 border-b-2 ">
            {hourlyWeather.length > 0 &&
                hourlyWeather.map((weather, index) => (
                    <div key={weather?.dt + index} className="px-1 w-1/5">
                        <div
                            className={`${
                                index === 0
                                    ? "modal-content-reverse"
                                    : "bg-transparent"
                            } p-2 text-center rounded-lg flex-col center`}
                        >
                            <p className="">
                                {moment
                                    .unix(weather.dt)
                                    .tz(timezone)
                                    .format("HH:mm")}
                            </p>
                            <div className="w-[42px] h-[42px]">
                                <img
                                    alt="weather-s-icon"
                                    src={set2xIconUrl(weather.weather[0]?.icon)}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="font-semibold text-base  ">
                                {renderTemp(weather)}
                                &deg;
                                {units === "metric" ? "C" : "F"}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Hourly;
