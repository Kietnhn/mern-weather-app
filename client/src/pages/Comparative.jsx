import React, { useContext } from "react";
import Wrapper from "../components/Wrapper";
import Compare from "../components/Desktop/Compare";
import CompareChart from "../components/Chart/CompareChart";
import CitiesWeather from "../components/CitiesWeather";
import DetailsInfo from "../components/Desktop/DetailsInfo";
import { WeatherContext } from "../contexts/WeatherContext";
const Comparative = () => {
    const {
        weatherState: {
            weatherData: { hourlyWeather },
        },
    } = useContext(WeatherContext);
    return (
        <Wrapper>
            <div className="h-full flex flex-col justify-between ">
                <div className="flex w-full flex-wrap">
                    <div className="w-2/5 px-3 mb-3">
                        <DetailsInfo weather={hourlyWeather[0]} />
                    </div>
                    <div className="w-2/5 px-3 mb-3">
                        <Compare />
                    </div>
                    <div className="w-1/5 px-3 mb-3">
                        <CitiesWeather />
                    </div>
                </div>
                <div className="w-full px-3 mb-3">
                    <CompareChart />
                </div>
            </div>
        </Wrapper>
    );
};

export default Comparative;
