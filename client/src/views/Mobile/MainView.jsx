import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import moment from "moment-timezone";
import { set2xIconUrl } from "../../utils/setIconUrl";

const MainView = () => {
    const {
        weatherState: {
            weatherData: { currentWeather, weeklyWeather, timezone },
            isLoading,
        },
    } = useContext(WeatherContext);
    return (
        <div
            className={` ${
                isLoading ? "animate-pulse" : ""
            } rounded-[12px] p-3`}
        >
            <div className="flex justify-between items-center -mx-2">
                <div className="">
                    <div className="flex">
                        <h4 className={`text-6xl font-semibold mr-3`}>
                            {currentWeather?.temp?.toFixed(0)}
                        </h4>
                        <div>
                            <h4 className="text-2xl">&deg;C</h4>
                            <h4 className={`text-2xl font-semibold `}>
                                {currentWeather?.weather[0].main}
                            </h4>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <h3 className="font-semibold text-base">
                            {currentWeather &&
                                moment
                                    .unix(currentWeather?.dt)
                                    .tz(timezone)
                                    .format("DD MMM dddd")}
                        </h3>
                        <span className={`ml-3 text-base font-semibold `}>
                            {weeklyWeather[0]?.temp.max?.toFixed(0)}
                            &deg;C /{weeklyWeather[0]?.temp.min?.toFixed(0)}
                            &deg;C
                        </span>
                    </div>
                </div>
                <div>
                    <img
                        src={set2xIconUrl(currentWeather?.weather[0]?.icon)}
                        alt={currentWeather?.weather[0]?.icon}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainView;
