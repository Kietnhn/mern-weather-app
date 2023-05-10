import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import { set2xIconUrl } from "../../utils/setIconUrl";
import moment from "moment-timezone";

const Weekly = () => {
    const {
        weatherState: {
            weatherData: { weeklyWeather, timezone },
        },
    } = useContext(WeatherContext);
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
                            {weeklyWeather[0].temp.max.toFixed(0)}
                            &deg;C /{weeklyWeather[0].temp.min.toFixed(0)}
                            &deg;C
                        </p>
                    </div>
                ))}
        </div>
    );
};

export default Weekly;
