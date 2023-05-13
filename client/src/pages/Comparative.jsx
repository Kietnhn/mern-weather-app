import React, { useContext, useState } from "react";
import Wrapper from "../components/Wrapper";
import Compare from "../components/Desktop/Compare";
import CompareChart from "../components/Chart/CompareChart";
import CitiesWeather from "../components/CitiesWeather";
import DetailsInfo from "../components/Desktop/DetailsInfo";
import { WeatherContext } from "../contexts/WeatherContext";
const Comparative = () => {
    const [type, setType] = useState("hourlyWeather");
    const {
        weatherState: { weatherData },
    } = useContext(WeatherContext);
    return (
        <Wrapper>
            <div className="h-full p-3 flex flex-col justify-between ">
                <div className="flex w-full flex-wrap mb-3">
                    <div className="w-2/5 px-3 mb-3 flex flex-wrap">
                        <div>
                            <h2 className="lg:text-2xl lg:font-semibold lg:mb-3">
                                Weather Type:
                            </h2>
                            <div className="flex gap-4">
                                {["hourlyWeather", "weeklyWeather"].map(
                                    (item) => (
                                        <div className="" key={item}>
                                            <button
                                                onClick={() => setType(item)}
                                                className={` button capitalize ${
                                                    type === item
                                                        ? "activeButton"
                                                        : ""
                                                }`}
                                            >
                                                {item}
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="w-full">
                            <DetailsInfo weather={weatherData[type][0]} />
                        </div>
                    </div>
                    <div className="w-2/5 px-3 mb-3">
                        <Compare />
                    </div>
                    <div className="w-1/5 px-3 mb-3">
                        <CitiesWeather />
                    </div>
                </div>
                <div className="w-full px-3 mb-3">
                    <CompareChart weatherType={type} />
                </div>
            </div>
        </Wrapper>
    );
};

export default Comparative;
