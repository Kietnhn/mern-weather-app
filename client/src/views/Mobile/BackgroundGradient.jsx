import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import setBackgroundGradient from "../../utils/setBackgroundGradient";
import convertToBackground from "../../utils/convertToBackground";

const BackgroundGradient = () => {
    const {
        weatherState: {
            weatherData: { currentWeather },
            isUseAnimateBackground,
        },
    } = useContext(WeatherContext);
    return (
        <div
            className={`lg:hidden fixed inset-0 bg-image duration-500 ${setBackgroundGradient(
                currentWeather?.weather[0]?.icon
            )} ${isUseAnimateBackground ? "brightness-75" : ""}`}
            style={{
                backgroundImage: `${
                    isUseAnimateBackground
                        ? `url(${convertToBackground(
                              currentWeather?.weather[0]?.icon
                          )})`
                        : ""
                }`,
            }}
        ></div>
    );
};

export default BackgroundGradient;
