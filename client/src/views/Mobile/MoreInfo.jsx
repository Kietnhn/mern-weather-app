import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";

const MoreInfo = () => {
    const {
        weatherState: {
            weatherData: { currentWeather },
        },
    } = useContext(WeatherContext);
    return (
        <div className="flex flex-wrap -m-2">
            <div className="w-1/2 p-2">
                <div
                    className="p-4 bg-transparent border rounded-xl
        mb-4 font-semibold  capitalize flex items-center justify-center
        flex-col"
                >
                    <span className="text-xl ">
                        {currentWeather?.feels_like}
                    </span>
                    <span className="text-text">feels like</span>
                </div>
            </div>
            <div className="w-1/2 p-2">
                <div
                    className="p-4 bg-transparent border rounded-xl
        mb-4 font-semibold  capitalize flex items-center justify-center
        flex-col"
                >
                    <span className="text-xl ">
                        {currentWeather?.clouds}
                        {/* oktas */}
                    </span>
                    <span className="text-text">clouds</span>
                </div>
            </div>
            <div className="w-1/2 p-2">
                <div
                    className="p-4 bg-transparent border rounded-xl
        mb-4 font-semibold  capitalize flex items-center justify-center
        flex-col"
                >
                    <span className="text-xl ">
                        {currentWeather?.visibility}
                    </span>
                    <span className="text-text">visibility</span>
                </div>
            </div>
            <div className="w-1/2 p-2">
                <div
                    className="p-4 bg-transparent border rounded-xl
        mb-4 font-semibold  capitalize flex items-center justify-center
        flex-col"
                >
                    <span className="text-xl ">
                        {currentWeather?.wind_speed}
                    </span>
                    <span className="text-text">wind</span>
                </div>
            </div>
            <div className="w-1/2 p-2">
                <div
                    className="p-4 bg-transparent border rounded-xl
        mb-4 font-semibold  capitalize flex items-center justify-center
        flex-col"
                >
                    <span className="text-xl ">{currentWeather?.pressure}</span>
                    <span className="text-text">pressure</span>
                </div>
            </div>
            <div className="w-1/2 p-2">
                <div
                    className="p-4 bg-transparent border rounded-xl
        mb-4 font-semibold  capitalize flex items-center justify-center
        flex-col"
                >
                    <span className="text-xl ">
                        {currentWeather?.humidity}%
                    </span>
                    <span className="text-text">humidity</span>
                </div>
            </div>
        </div>
    );
};

export default MoreInfo;
