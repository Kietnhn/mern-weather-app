import { useContext, useEffect } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import { Navigate } from "react-router-dom";
import { SkeletonToday } from "../layout/Skeletons";
import TodayDesktop from "../views/Desktop/TodayDesktop";
import useDetectUserDevice from "../hooks/useDetectUserDevice";
import MainView from "../views/Mobile/MainView";
import Hourly from "../views/Mobile/Hourly";
import Weekly from "../views/Mobile/Weekly";
import MoreInfo from "../views/Mobile/MoreInfo";
import useDarkMode from "../hooks/useDarkMode";
import SemiDoughnut from "../components/Chart/SemiDoughnut";
// import useDarkMode from "../hooks/useDarkMode";
function Today() {
    const {
        weatherState: {
            weatherData: { currentWeather, weeklyWeather },
            isLoading,
        },
    } = useContext(WeatherContext);
    const [isMobile] = useDetectUserDevice();
    // eslint-disable-next-line no-unused-vars
    const [colorTheme, setTheme] = useDarkMode();

    useEffect(() => {
        // auto set theme by weather
        if (currentWeather) {
            const icon = currentWeather?.weather[0]?.icon;
            if (icon?.includes("n")) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWeather]);

    if (!weeklyWeather || !currentWeather) return <Navigate to="/landing" />;
    if (isLoading) return <SkeletonToday />;
    return (
        <>
            {isMobile ? (
                <>
                    <div className="fixed bottom-0 left-0 right-0 h-[70vh] overflow-auto p-6 xl:hidden">
                        <MainView />
                        <Hourly />
                        <Weekly />
                        <MoreInfo />
                        <div className="w-[240px] h-[240px] mx-auto mb-6">
                            <SemiDoughnut
                                className="h-full  between flex-col"
                                percen={currentWeather.clouds}
                                message={currentWeather.weather[0].description}
                                onClick={() => {}}
                            />
                            <h3 className="font-semibold text-center text-xl">
                                Clouds chart
                            </h3>
                        </div>
                    </div>
                </>
            ) : (
                <TodayDesktop />
            )}
        </>
    );
}

export default Today;
