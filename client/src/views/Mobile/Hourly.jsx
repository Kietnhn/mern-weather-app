import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import moment from "moment-timezone";
import { set2xIconUrl } from "../../utils/setIconUrl";

const Hourly = () => {
    const {
        weatherState: {
            weatherData: { timezone, hourlyWeather },
        },
    } = useContext(WeatherContext);
    return (
        <div className="flex w-full overflow-auto -mx-1  pb-2 border-b-2 ">
            {hourlyWeather.length > 0 &&
                hourlyWeather.map((weather, index) => (
                    <div key={weather?.dt + index} className="px-1 w-1/5">
                        <div className="bg-transparent p-2 text-center rounded-lg flex flex-col items-center justify-center">
                            <p className="">
                                {moment
                                    .unix(weather.dt)
                                    .tz(timezone)
                                    .format("HH")}
                                :00
                            </p>
                            <div className="w-[42px] h-[42px]">
                                <img
                                    alt="weather-s-icon"
                                    src={set2xIconUrl(weather.weather[0]?.icon)}
                                    className="w-full h-full onject-cover"
                                />
                            </div>
                            <p className="font-semibold text-base  ">
                                {weather?.temp
                                    ? weather?.temp?.toFixed(0)
                                    : weather?.main?.temp?.toFixed(0)}
                                &deg;C
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Hourly;
