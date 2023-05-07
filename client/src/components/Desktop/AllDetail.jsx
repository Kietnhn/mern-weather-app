import React, { useContext, useState } from "react";
import Time from "./Time";
import SemiDoughnut from "../Chart/SemiDoughnut";
import { set2xIconUrl } from "../../utils/setIconUrl";
import setTempByTime from "../../utils/setTempByTime";
import { WeatherContext } from "../../contexts/WeatherContext";
import ChartSun from "../Chart/ChartSun";
import RadarChart from "../Chart/RadarChart";
import moment from "moment-timezone";
const AllDetail = ({ weather, timezone, isUseWeekly = false }) => {
    const { setDataChart } = useContext(WeatherContext);
    const removeMinMax = (object) => {
        delete object.min;
        delete object.max;
        return object;
    };
    const [customWeather] = useState([
        {
            name: "uvi",
            unit: "",
        },
        {
            name: "wind_deg",
            unit: "\u00B0",
        },
        {
            name: "wind_speed",
            unit: "m/s",
        },
        {
            name: "pressure",
            unit: "hPa",
        },
        {
            name: "visibility",
            unit: "ms",
        },
    ]);
    const handleSetDataChart = (dataChart) => {
        if (!isUseWeekly) {
            setDataChart(dataChart);
        }
    };

    if (!weather) return <></>;
    return (
        <div className="w-full">
            <div className="flex -mx-2 font-semibold justify-between">
                <div className="w-1/4 p-2 ">
                    <div className="dark:bg-[#232228] rounded-xl bg-[#dee1e6] px-4 py-2">
                        {isUseWeekly ? (
                            <RadarChart
                                datas={[
                                    weather.feels_like,
                                    removeMinMax(weather.temp),
                                ]}
                                labels={["feels_like", "temp"]}
                            />
                        ) : (
                            <div className="flex flex-wrap -mx-2">
                                <div className="flex justify-between items-center w-1/2 p-2">
                                    <button
                                        className="capitalize hover:cursor-pointer"
                                        onClick={() =>
                                            handleSetDataChart("feels_like")
                                        }
                                    >
                                        feels_like:
                                    </button>
                                    <h2>
                                        {isUseWeekly
                                            ? weather.feels_like[
                                                  setTempByTime(
                                                      moment
                                                          .unix(weather.dt)
                                                          .tz(timezone)
                                                          .format("HH")
                                                  )
                                              ].toFixed(0)
                                            : weather.feels_like}
                                        <span>&deg;</span>
                                    </h2>
                                </div>
                                {customWeather.map((item) => (
                                    <div
                                        className="flex justify-between items-center w-1/2 py-2"
                                        key={`${item.name} ${item.unit}`}
                                    >
                                        <button
                                            className="capitalize hover:cursor-pointer"
                                            onClick={() =>
                                                handleSetDataChart(item.name)
                                            }
                                        >
                                            {item.name.split("_").join(" ")}
                                        </button>
                                        <h2>
                                            {weather[item.name]}
                                            <span> {item.unit}</span>
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-[30%] px-2 flex flex-wrap ">
                    <div className="w-1/2 p-2 z-10  ">
                        <div className="dark:bg-[#232228] rounded-xl bg-[#dee1e6]">
                            <SemiDoughnut
                                name="clouds"
                                percen={weather.clouds}
                                onClick={() => handleSetDataChart("clouds")}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 p-2 z-10 ">
                        <div className="dark:bg-[#232228] rounded-xl bg-[#dee1e6]">
                            <SemiDoughnut
                                name="humidity"
                                percen={weather.humidity}
                                onClick={() => handleSetDataChart("humidity")}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-[20%] p-2 overflow-hidden ">
                    <ChartSun
                        weather={weather}
                        timezone={timezone}
                        className="relative w-full  p-4 dark:bg-[#232228] rounded-xl bg-[#dee1e6]"
                    />
                </div>

                <div className="w-1/4 p-2">
                    <div className="flex flex-wrap items-center justify-between font-semibold dark:bg-[#232228] rounded-xl bg-[#dee1e6] p-2">
                        <div className="w-full flex items-center justify-between">
                            <Time
                                weather={weather}
                                timezone={timezone}
                                isUseWeekly={isUseWeekly}
                            />
                            <div>
                                <img
                                    src={set2xIconUrl(weather.weather[0].icon)}
                                    alt={weather.weather[0].icon}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-6xl ">
                                {weather.weather[0].main}
                            </h1>

                            <p
                                className={`capitalize ${
                                    isUseWeekly ? "px-2" : ""
                                }`}
                            >
                                {weather.weather[0].description}
                            </p>
                        </div>

                        <h2
                            className="text-8xl hover:cursor-pointer text-end -mt-1"
                            onClick={() => handleSetDataChart("temp")}
                        >
                            {isUseWeekly
                                ? weather.temp[
                                      setTempByTime(
                                          moment
                                              .unix(weather.dt)
                                              .tz(timezone)
                                              .format("HH")
                                      )
                                  ].toFixed(0)
                                : weather.temp?.toFixed(0)}
                            &deg;
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllDetail;
