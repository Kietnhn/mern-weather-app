import React, { useContext, useEffect } from "react";
import ChartSun from "./Chart/ChartSun";
import Wrapper from "./Wrapper";
import { WeatherContext } from "../contexts/WeatherContext";

const Sunview = () => {
    const {
        weatherState: {
            weatherData: { currentWeather, timezone, lat, lon },
            sunData,
        },
        getSunData,
    } = useContext(WeatherContext);

    useEffect(() => {
        const fetchApi = async () => {
            await getSunData({ lat, lon, timezone });
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Wrapper title="Sun & Moon" id="sunmoon">
            <div className="relative h-[calc(100%-40px)] flex flex-col justify-end">
                <div className="absolute min-w-[260px] top-0 left-0 bg-transparent animate-moveLeftToRight lg:animate-moveInSideWrap hover:pause">
                    {sunData && (
                        <div className="theme modal-content border-1 rounded-2xl p-3">
                            {[...Object.keys(sunData)].map((item) => (
                                <div
                                    className="px-3 font-semibold between gap-4"
                                    key={item}
                                >
                                    <span className="text-text capitalize">
                                        {item.split("_").join(" ")}:
                                    </span>
                                    <span>{sunData[item]}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-[282px] lg:mt-0">
                    <ChartSun
                        weather={currentWeather}
                        timezone={timezone}
                        className={"h-[180px] lg:h-[360px]"}
                    />
                </div>
            </div>
        </Wrapper>
    );
};

export default Sunview;
