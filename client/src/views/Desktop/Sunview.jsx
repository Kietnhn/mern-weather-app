import React, { useContext, useEffect } from "react";
import ChartSun from "../../components/Chart/ChartSun";
import Wrapper from "../../components/Wrapper";
import { WeatherContext } from "../../contexts/WeatherContext";

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
                <div className="absolute top-0 left-0 bg-transparent animate-moveInSideWrap">
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

                <div className="">
                    <ChartSun weather={currentWeather} timezone={timezone} />
                </div>
            </div>
        </Wrapper>
    );
};

export default Sunview;
