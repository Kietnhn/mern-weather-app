import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";

const DetailsInfo = ({ weather, weatherType = "hourlyWeather" }) => {
    const {
        setDataChart,
        weatherState: { dataChart },
    } = useContext(WeatherContext);
    const [datas, setDatas] = useState(null);
    useEffect(() => {
        const weatherData = { ...weather };
        delete weatherData.dt;
        delete weatherData.weather;
        if (weatherType === "hourlyWeather") {
            delete weatherData.sunrise;
            delete weatherData.sunset;
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
            <div className="font-semibold capitalize flex  flex-wrap gap-4">
                <div className="w-full text-2xl font-semibold">
                    <h2>Data Chart:</h2>
                </div>
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
                                className={`w-full  button capitalize ${
                                    dataChart === data.key ? "activeButton" : ""
                                }`}
                            >
                                {data.key}
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default DetailsInfo;
