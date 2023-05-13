import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import Weekly from "../components/Desktop/Weekly";
import AllDetail from "../components/Desktop/AllDetail";

import moment from "moment-timezone";
import setBackgroundGradient from "../utils/setBackgroundGradient";
import { ModalCompare } from "../components/Modals";
import convertCelsiusToFahrenheit from "../utils/convertCelsiusToFahrenheit";
import setTempByTime from "../utils/setTempByTime";
import { SettingsContext } from "../contexts/SettingsContext";
function Next7Day() {
    const {
        weatherState: { isCompare, dataChart, weatherData },
        setCompare,
        setIsCompare,
    } = useContext(WeatherContext);
    const {
        settingsState: { units },
    } = useContext(SettingsContext);
    const [indexActive, setIndexActive] = useState(0);
    const ActiveDay = ({ weather }) => {
        return (
            <div className="flex flex-wrap w-full">
                <div className="w-1/2">
                    {[
                        "clouds",
                        "feels_like",
                        "humidity",
                        "pop",
                        "pressure",
                        "wind_speed",
                    ].map((item) => {
                        return (
                            <div key={item}>
                                <span className="text-text font-semibold capitalize">
                                    {item.split("_").join(" ")}
                                </span>
                                {item === "feels_like"
                                    ? convertCelsiusToFahrenheit(
                                          weather.feels_like[
                                              setTempByTime(
                                                  moment
                                                      .unix(weather.dt)
                                                      .tz(weatherData.timezone)
                                                      .format("HH")
                                              )
                                          ],
                                          units !== "metric"
                                      )
                                    : weather[item]}
                            </div>
                        );
                    })}
                </div>
                <div className="w-1/2 flex flex-col justify-end">
                    {["max", "min"].map((item) => (
                        <div key={item}>
                            <span className="text-text font-semibold">
                                Temp {item}:{" "}
                            </span>
                            {weather?.temp[item]}
                            &deg;
                        </div>
                    ))}
                    {["sunrise", "sunset"].map((item) => (
                        <div key={item}>
                            <span className="text-text font-semibold capitalize">
                                {item}:{" "}
                            </span>
                            {moment
                                .unix(weather[item])
                                .tz(weatherData.timezone)
                                .format("LT")}
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    useEffect(() => {
        if (isCompare) {
            setIsCompare(false);
            setCompare([{ ...weatherData }]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (!isCompare) {
            setCompare([{ ...weatherData }]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weatherData]);
    if (!weatherData.weeklyWeather) return <></>;
    return (
        <>
            {window.innerWidth < 992 ? (
                <div className="fixed bottom-0 left-6 right-6 h-[75vh] overflow-auto lg:hidden">
                    <div className={`flex flex-wrap mb-16`}>
                        {weatherData.weeklyWeather?.length > 0 &&
                            weatherData.weeklyWeather.map((weather, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`w-full mb-4 p-5
                                 ${setBackgroundGradient(
                                     weather.weather[0].icon
                                 )} rounded-xl  flex justify-between items-center ${
                                            indexActive === index && "flex-wrap"
                                        } `}
                                        onClick={() => setIndexActive(index)}
                                    >
                                        <div
                                            className={
                                                indexActive === index
                                                    ? "flex justify-between w-full"
                                                    : ""
                                            }
                                        >
                                            <h3
                                                className={`font-semibold text-base duration-100 ${
                                                    indexActive === index
                                                        ? "text-xl w-1/2 text-center"
                                                        : ""
                                                }`}
                                            >
                                                {index === 0
                                                    ? "Today"
                                                    : moment
                                                          .unix(weather.dt)
                                                          .tz(
                                                              weatherData.timezone
                                                          )
                                                          .format("dddd")}
                                            </h3>
                                            <h4
                                                className={`${
                                                    indexActive === index
                                                        ? "text-xl w-1/2 text-center"
                                                        : ""
                                                } duration-100`}
                                            >
                                                {moment
                                                    .unix(weather.dt)
                                                    .tz(weatherData.timezone)
                                                    .format("DD MMM")}
                                            </h4>
                                        </div>
                                        <h4
                                            className={`duration-100 font-semibold ${
                                                indexActive === index
                                                    ? "w-1/2 text-6xl"
                                                    : "text-3xl   "
                                            }`}
                                        >
                                            {convertCelsiusToFahrenheit(
                                                weather.temp[
                                                    setTempByTime(
                                                        moment
                                                            .unix(weather.dt)
                                                            .tz(
                                                                weatherData.timezone
                                                            )
                                                            .format("HH")
                                                    )
                                                ],
                                                units !== "metric"
                                            )}
                                            &deg;
                                        </h4>
                                        <div
                                            className={` duration-100 ${
                                                indexActive === index
                                                    ? "w-1/2 center translate-y-8"
                                                    : ""
                                            }`}
                                        >
                                            <img
                                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                                alt="weather-icon"
                                                className={` object-cover ${
                                                    indexActive === index
                                                        ? "w-full h-20"
                                                        : "w-14 h-14"
                                                }`}
                                            />
                                        </div>
                                        {indexActive === index && (
                                            <ActiveDay weather={weather} />
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ) : (
                <div className="hidden lg:block relative w-full h-full">
                    {isCompare ? (
                        <>
                            <ModalCompare
                                weather={weatherData.weeklyWeather[indexActive]}
                                isUseWeekly={true}
                                weatherType="weeklyWeather"
                                dataChart={dataChart}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col justify-between">
                            <AllDetail
                                weather={weatherData.weeklyWeather[indexActive]}
                                timezone={weatherData.timezone}
                                isUseWeekly={true}
                            />
                            <Weekly
                                indexActive={indexActive}
                                setIndexActive={setIndexActive}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
export default Next7Day;
