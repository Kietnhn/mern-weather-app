import React, { useContext, useEffect, useState } from "react";
import Minutely from "../components/Chart/Minutely";
import { WeatherContext } from "../contexts/WeatherContext";
import ShowHistoryButton from "../components/Button/ShowHistoryButton";
import Hourly from "../components/Chart/Hourly";
import DetailsInfo from "../components/Desktop/DetailsInfo";
import { Wrapper } from "../components";
import Weekly from "../components/Chart/Weekly";
import { Navigate } from "react-router-dom";

const ChartPage = () => {
    const [mode, setMode] = useState("minutely");
    const {
        weatherState: {
            weatherData: {
                timezone,
                minutelyWeather,
                hourlyWeather,
                weeklyWeather,
            },
            dataChart,
        },
        setDataChart,
    } = useContext(WeatherContext);
    useEffect(() => {
        setDataChart("temp");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);
    return (
        <Wrapper className="fixed bottom-0 left-6 right-6 max-h-[80vh] overflow-auto">
            <div className="between flex-wrap -mx-3 mb-3">
                {["minutely", "hourly", "daily", "compare"].map((item) => (
                    <div className="w-1/2 px-3 mb-6" key={item}>
                        <button
                            className="button w-full capitalize"
                            onClick={() => setMode(item)}
                        >
                            {item}
                        </button>
                    </div>
                ))}
            </div>
            {mode === "minutely" && (
                <div className="w-full relative mb-5">
                    <h3 className="mb-3">Minutely data in next hour</h3>
                    <Minutely
                        timezone={timezone}
                        minutelies={minutelyWeather}
                    />
                    <h3 className="font-semibold text-center text-xl">
                        Minutely Chart
                    </h3>
                </div>
            )}
            {mode === "hourly" && (
                <div className="w-full mb-5">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="">
                            Hourly infomation:
                            <span className="ml-1 capitalize">{dataChart}</span>
                        </h3>
                        <ShowHistoryButton />
                    </div>
                    <div className="w-full relative">
                        <Hourly weathers={hourlyWeather} />
                    </div>
                    <div>
                        <DetailsInfo weather={hourlyWeather[0]} />
                    </div>
                </div>
            )}
            {mode === "daily" && (
                <div className="w-full mb-5">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="">
                            Weekly infomation:
                            <span className="ml-1 capitalize">{dataChart}</span>
                        </h3>
                    </div>
                    <div className="w-full relative">
                        <Weekly weathers={weeklyWeather} />
                    </div>
                    <div>
                        <DetailsInfo
                            weather={weeklyWeather[0]}
                            weatherType="weeklyWeather"
                        />
                    </div>
                </div>
            )}
            {/* {mode === "compare" && <Navigate to="/comparative" />} */}
        </Wrapper>
    );
};

export default ChartPage;
