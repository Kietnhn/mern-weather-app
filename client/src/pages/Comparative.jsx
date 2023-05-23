import React, { useContext, useState } from "react";
import Wrapper from "../components/Wrapper";
import Compare from "../components/Desktop/Compare";
import CompareChart from "../components/Chart/CompareChart";
import CitiesWeather from "../components/CitiesWeather";
import DetailsInfo from "../components/Desktop/DetailsInfo";
import { WeatherContext } from "../contexts/WeatherContext";
import Cities from "../views/Desktop/Cities";
const Comparative = () => {
    const [type, setType] = useState("hourlyWeather");
    const {
        weatherState: { weatherData },
    } = useContext(WeatherContext);
    return (
        <Wrapper>
            <div className="md:h-[calc(100vh-24px)] lg:h-full p-3 flex flex-col justify-between  md:pt-[52px]  lg:pt-0">
                <div className="flex w-full flex-wrap mb-3">
                    <div className="md:w-3/5 xl:w-2/5 px-3 mb-3 max-h-[300px] xl:max-h-[360px] overflow-auto flex flex-wrap">
                        <div>
                            <h2 className="xl:text-2xl xl:font-semibold xl:mb-3">
                                Weather Type:
                            </h2>
                            <div className="flex gap-4">
                                {["hourlyWeather", "weeklyWeather"].map(
                                    (item) => (
                                        <div className="" key={item}>
                                            <button
                                                onClick={() => setType(item)}
                                                className={`md:text-sm lg:text-base button capitalize ${
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
                    <div className=" w-2/5 px-3 mb-3 max-h-[300px] xl:max-h-[360px] overflow-auto">
                        <Compare />
                    </div>
                    <div className="md:hidden lg:block w-1/5 px-3 mb-3">
                        <CitiesWeather />
                    </div>
                    <div className="hidden md:block lg:hidden">
                        <Cities />
                    </div>
                </div>
                <div className="w-full px-3 mb-3 md:h-[280px] lg:h-[360px]">
                    <CompareChart weatherType={type} />
                </div>
            </div>
        </Wrapper>
    );
};

export default Comparative;
