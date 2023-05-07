import { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import setIconUrl from "../../utils/setIconUrl";
import moment from "moment-timezone";

const Weekly = ({ setIndexActive = () => {}, indexActive = 0 }) => {
    const {
        weatherState: {
            weatherData: { weeklyWeather, timezone },
        },
    } = useContext(WeatherContext);
    return (
        <div className="w-full relative ">
            <div className=" flex font-semibold -mx-2">
                {weeklyWeather.length > 0 &&
                    weeklyWeather.map((weather, index) => (
                        <div
                            onClick={() => setIndexActive(index)}
                            className={`w-1/8 px-2  
                                
                            `}
                            key={weather.dt}
                        >
                            <div
                                className={`hover:cursor-pointer hover:shadow-[0px_0px_10px_3px_#ccc]  
                                duration-500 px-3 py-2 rounded-lg bg-transparent flex-col center ${
                                    index === indexActive
                                        ? "shadow-[0px_0px_10px_3px_#ccc]"
                                        : " "
                                }`}
                            >
                                <h3 className="uppercase">
                                    {index === 0
                                        ? "Today"
                                        : moment
                                              .unix(weather.dt)
                                              .tz(timezone)
                                              .format("ddd")}
                                </h3>
                                <div className="flex gap-4 items-center">
                                    <div className="w-14 h-14">
                                        <img
                                            src={setIconUrl(
                                                weather.weather[0].icon
                                            )}
                                            alt={weather.weather[0].icon}
                                        />
                                    </div>
                                    <p>{weather.temp.day.toFixed(0)}&deg;</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default Weekly;
