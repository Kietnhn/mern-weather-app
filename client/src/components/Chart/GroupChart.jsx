import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import ChartSun from "../../views/ChartSun/ChartSun";
import SemiDoughnut from "./SemiDoughnut";

const GroupChart = ({ weather, timezone, isUseWeekly = false }) => {
    const { setDataChart } = useContext(WeatherContext);
    const handleSetDataChart = (dataChart) => {
        if (!isUseWeekly) {
            setDataChart(dataChart);
        }
    };
    return (
        <div className="flex -mx-3 flex-wrap">
            <div className="w-1/2 p-3 z-10  ">
                <div className="dark:bg-[#232228] rounded-xl bg-[#dee1e6]">
                    <SemiDoughnut
                        name="clouds"
                        percen={weather.clouds}
                        onClick={() => handleSetDataChart("clouds")}
                    />
                </div>
            </div>
            <div className="w-1/2 p-3 z-10 ">
                <div className="dark:bg-[#232228] rounded-xl bg-[#dee1e6]">
                    <SemiDoughnut
                        name="humidity"
                        percen={weather.humidity}
                        onClick={() => handleSetDataChart("humidity")}
                    />
                </div>
            </div>
            <div className="w-full p-3 overflow-hidden ">
                <ChartSun
                    weather={weather}
                    timezone={timezone}
                    className="relative w-full  p-4 dark:bg-[#232228] rounded-xl bg-[#dee1e6]"
                />
            </div>
        </div>
    );
};

export default GroupChart;
