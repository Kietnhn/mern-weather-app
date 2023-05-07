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
            <div className="p-3">
                {sunData && (
                    <div className="theme">
                        {[...Object.keys(sunData)].map((item) => (
                            <div
                                className="px-3 font-semibold text-base flex gap-4 items-center"
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
            <ChartSun weather={currentWeather} timezone={timezone} />
        </Wrapper>
    );
};

export default Sunview;
