import { useContext } from "react";
import convertToBackground from "../utils/convertToBackground";
import { WeatherContext } from "../contexts/WeatherContext";
import moment from "moment-timezone";
import { Navigate } from "react-router-dom";
import { set2xIconUrl } from "../utils/setIconUrl";
import ChartSun from "../components/Chart/ChartSun";
import { SkeletonToday } from "../layout/Skeletons";
import setBackgroundGradient from "../utils/setBackgroundGradient";
import TodayDesktop from "../views/Desktop/TodayDesktop";
// import useDarkMode from "../hooks/useDarkMode";
function Today() {
    const {
        weatherState: {
            weatherData: {
                currentWeather,
                weeklyWeather,
                timezone,
                hourlyWeather,
            },
            isLoading,
            isUseAnimateBackground,
        },
    } = useContext(WeatherContext);
    // const [colorTheme, setTheme] = useDarkMode();

    // useEffect(() => {
    //     // auto set theme by weather
    //     const icon = currentWeather?.weather[0]?.icon;
    //     if (icon?.includes("n")) {
    //         localStorage.setItem("theme", "light");
    //         setTheme("dark");
    //     } else {
    //         localStorage.setItem("theme", "dark");
    //         setTheme("light");
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    if (!weeklyWeather || !currentWeather) return <Navigate to="/landing" />;
    if (window.innerWidth > 992) return <TodayDesktop />;
    if (isLoading) return <SkeletonToday />;
    return (
        <>
            {/* bg */}
            <div
                className={`lg:hidden fixed inset-0 bg-image duration-500 ${setBackgroundGradient(
                    currentWeather?.weather[0]?.icon
                )} ${isUseAnimateBackground ? "brightness-75" : ""}`}
                style={{
                    backgroundImage: `${
                        isUseAnimateBackground
                            ? `url(${convertToBackground(
                                  currentWeather?.weather[0]?.icon
                              )})`
                            : ""
                    }`,
                }}
            ></div>
            <div className="fixed bottom-0 left-0 right-0 h-[70vh] overflow-auto p-6 lg:hidden">
                <div
                    className={` ${
                        isLoading ? "animate-pulse" : ""
                    } rounded-[12px] p-3`}
                >
                    <div className="flex justify-between items-center -mx-2">
                        <div className="">
                            <div className="flex">
                                <h4 className={`text-6xl font-semibold mr-3`}>
                                    {currentWeather?.temp?.toFixed(0)}
                                </h4>
                                <div>
                                    <h4 className="text-2xl">&deg;C</h4>
                                    <h4 className={`text-2xl font-semibold `}>
                                        {currentWeather?.weather[0].main}
                                    </h4>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <h3 className="font-semibold text-base">
                                    {currentWeather &&
                                        moment
                                            .unix(currentWeather?.dt)
                                            .tz(timezone)
                                            .format("DD MMM dddd")}
                                </h3>
                                <span
                                    className={`ml-3 text-base font-semibold `}
                                >
                                    {weeklyWeather[0]?.temp.max?.toFixed(0)}
                                    &deg;C /
                                    {weeklyWeather[0]?.temp.min?.toFixed(0)}
                                    &deg;C
                                </span>
                            </div>
                        </div>
                        <div>
                            <img
                                src={set2xIconUrl(
                                    currentWeather?.weather[0]?.icon
                                )}
                                alt={currentWeather?.weather[0]?.icon}
                            />
                        </div>
                    </div>
                </div>
                {/* hourly */}
                <div className="flex w-full overflow-auto -mx-1  pb-2 border-b-2 ">
                    {hourlyWeather.length > 0 &&
                        hourlyWeather.map((weather, index) => (
                            <div
                                key={weather?.dt + index}
                                className="px-1 w-1/5"
                            >
                                <div className="bg-transparent p-2 text-center rounded-lg flex flex-col items-center justify-center">
                                    <p className="">
                                        {moment
                                            .unix(weather.dt)
                                            .tz(timezone)
                                            .format("HH")}
                                        :00
                                    </p>
                                    <div className="w-[42px] h-[42px]">
                                        <img
                                            alt="weather-s-icon"
                                            src={set2xIconUrl(
                                                weather.weather[0]?.icon
                                            )}
                                            className="w-full h-full onject-cover"
                                        />
                                    </div>
                                    <p className="font-semibold text-base  ">
                                        {weather?.temp
                                            ? weather?.temp?.toFixed(0)
                                            : weather?.main?.temp?.toFixed(0)}
                                        &deg;C
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
                {/* weekly */}
                <div className="my-2">
                    {weeklyWeather.length > 0 &&
                        weeklyWeather.map((weather, index) => (
                            <div
                                key={weather?.dt + index}
                                className="w-full flex justify-between items-center"
                            >
                                <p className="w-[90px]">
                                    {index === 0
                                        ? "Today"
                                        : moment
                                              .unix(weather.dt)
                                              .tz(timezone)
                                              .format("dddd")}
                                </p>
                                <div className="flex items-center">
                                    <div className="w-[42px] h-[42px]">
                                        <img
                                            alt="weather-s-icon"
                                            src={set2xIconUrl(
                                                weather.weather[0]?.icon
                                            )}
                                            className="w-full h-full onject-cover"
                                        />
                                    </div>
                                    <div className="w-[86px] overflow-hidden relative">
                                        <p
                                            className={`whitespace-nowrap animate-loadText`}
                                            style={{
                                                animationDelay: `${
                                                    index * 500
                                                }ms`,
                                            }}
                                        >
                                            {
                                                weeklyWeather[0].weather[0]
                                                    .description
                                            }
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold text-base  ">
                                    {weeklyWeather[0].temp.max.toFixed(0)}
                                    &deg;C /
                                    {weeklyWeather[0].temp.min.toFixed(0)}
                                    &deg;C
                                </p>
                            </div>
                        ))}
                </div>
                {/* more info */}
                <div className="flex flex-wrap -m-2">
                    <div className="w-1/2 p-2">
                        <div
                            className="p-4 bg-transparent border rounded-xl
                        mb-4 font-semibold  capitalize flex items-center justify-center
                        flex-col"
                        >
                            <span className="text-xl ">
                                {currentWeather?.feels_like}
                            </span>
                            <span className="text-text">feels like</span>
                        </div>
                    </div>
                    <div className="w-1/2 p-2">
                        <div
                            className="p-4 bg-transparent border rounded-xl
                        mb-4 font-semibold  capitalize flex items-center justify-center
                        flex-col"
                        >
                            <span className="text-xl ">
                                {currentWeather?.clouds}
                                {/* oktas */}
                            </span>
                            <span className="text-text">clouds</span>
                        </div>
                    </div>
                    <div className="w-1/2 p-2">
                        <div
                            className="p-4 bg-transparent border rounded-xl
                        mb-4 font-semibold  capitalize flex items-center justify-center
                        flex-col"
                        >
                            <span className="text-xl ">
                                {currentWeather?.visibility}
                            </span>
                            <span className="text-text">visibility</span>
                        </div>
                    </div>
                    <div className="w-1/2 p-2">
                        <div
                            className="p-4 bg-transparent border rounded-xl
                        mb-4 font-semibold  capitalize flex items-center justify-center
                        flex-col"
                        >
                            <span className="text-xl ">
                                {currentWeather?.wind_speed}
                            </span>
                            <span className="text-text">wind</span>
                        </div>
                    </div>
                    <div className="w-1/2 p-2">
                        <div
                            className="p-4 bg-transparent border rounded-xl
                        mb-4 font-semibold  capitalize flex items-center justify-center
                        flex-col"
                        >
                            <span className="text-xl ">
                                {currentWeather?.pressure}
                            </span>
                            <span className="text-text">pressure</span>
                        </div>
                    </div>
                    <div className="w-1/2 p-2">
                        <div
                            className="p-4 bg-transparent border rounded-xl
                        mb-4 font-semibold  capitalize flex items-center justify-center
                        flex-col"
                        >
                            <span className="text-xl ">
                                {currentWeather?.humidity}%
                            </span>
                            <span className="text-text">humidity</span>
                        </div>
                    </div>
                </div>
                {/* chart sun */}
                <ChartSun className="mt-4 mb-40" />
            </div>
        </>
    );
}

export default Today;
