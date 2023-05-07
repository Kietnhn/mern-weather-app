import React, { useContext } from "react";
import data from "../../routes/viewInfoData";
import Time from "./Time";
import { set2xIconUrl } from "../../utils/setIconUrl";
import setTempByTime from "../../utils/setTempByTime";
import moment from "moment-timezone";
import { WeatherContext } from "../../contexts/WeatherContext";
import SwitchUnitTemp from "../Button/SwitchUnitTemp";

const MainView = ({ weather, timezone, indexActive }) => {
    const { setDataChart } = useContext(WeatherContext);

    const handleSetDataChart = (dataChart) => {
        setDataChart(dataChart);
    };
    const InfoItem = ({ item }) => {
        const Icon = item.icon;
        return (
            <div
                className="flex items-center gap-3 px-3 py-2 rounded-lg  font-semibold hover:cursor-pointer hover:shadow-[0px_0px_10px_3px_#ccc] duration-100"
                onClick={() => handleSetDataChart(item.name)}
            >
                <div>
                    <span>
                        <Icon width="24px" height="24px" />
                    </span>
                </div>
                <div>
                    <h3 className=" text-xl">
                        {weather[item.name]}
                        <span> {item.unit}</span>
                    </h3>
                    <p className="capitalize text-text leading-3">
                        {item.name.split("_").join(" ")}
                    </p>
                </div>
            </div>
        );
    };
    if (!weather) return <></>;
    return (
        <div className="">
            <div className="flex justify-between items-center mb-3">
                <Time timezone={timezone} weather={weather} />
                <SwitchUnitTemp />
            </div>
            <div className="flex justify-between items-center -mx-3">
                <div className="w-2/5 px-3">
                    <div className="flex items-center justify-center">
                        <div>
                            <img
                                src={set2xIconUrl(weather.weather[0].icon)}
                                alt={weather.weather[0].icon}
                            />
                        </div>
                        <div>
                            <h1
                                className="text-6xl font-semibold hover:cursor-pointer"
                                onClick={() => handleSetDataChart("temp")}
                            >
                                {indexActive === 0
                                    ? weather.temp
                                    : weather.temp[
                                          setTempByTime(
                                              moment
                                                  .unix(weather.dt)
                                                  .tz(timezone)
                                                  .format("HH")
                                          )
                                      ]}
                                &deg;
                            </h1>
                            <p className="font-semibold">
                                {weather.weather[0].main}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-3/5 px-3">
                    <div className="flex flex-wrap -mx-3">
                        {data.map((item) => (
                            <div
                                key={item.name + item.unit}
                                className="w-1/3 px-3 mb-3"
                            >
                                <InfoItem item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainView;
