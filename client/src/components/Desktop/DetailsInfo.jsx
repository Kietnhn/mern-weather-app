import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import { useLocation } from "react-router-dom";

const DetailsInfo = ({ weather, weatherType = "hourlyWeather" }) => {
    const {
        setDataChart,
        weatherState: { dataChart },
    } = useContext(WeatherContext);
    const [datas, setDatas] = useState(null);
    const location = useLocation();
    useEffect(() => {
        const weatherData = { ...weather };
        delete weatherData.dt;
        delete weatherData.weather;
        delete weatherData?.rain;
        delete weatherData?.wind_gust;
        if (location.pathname !== "/comparative") {
            delete weatherData.sunrise;
            delete weatherData.sunset;
            if (weatherType === "weeklyWeather") {
                delete weatherData.moonrise;
                delete weatherData.moonset;
            }
        }
        const datas = Object.keys(weatherData).map((key) => ({
            key: key,
            value: weather[key],
        }));
        setDatas(datas);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weather]);

    if (!weather || !datas) return <></>;
    return (
        <>
            <div className="xl:font-semibold capitalize ">
                <div className="w-full xl:text-2xl xl:font-semibold xl:mb-3">
                    <h2>Data Chart:</h2>
                </div>
                <div className="flex  flex-wrap gap-4">
                    {datas.map((data, index) => {
                        return (
                            <div
                                className={`flex `}
                                style={{
                                    animationDelay: `${index * 500}ms`,
                                }}
                                key={data.key}
                            >
                                <button
                                    onClick={() => setDataChart(data.key)}
                                    className={`w-full md:text-sm lg:text-base button capitalize ${
                                        dataChart === data.key
                                            ? "activeButton"
                                            : ""
                                    }`}
                                >
                                    {data.key.split("_").join(" ")}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
export default DetailsInfo;
