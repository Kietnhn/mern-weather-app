import { useContext, useState } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import Weekly from "./Desktop/Weekly";
import Hourly from "./Chart/Hourly";
import Minutely from "./Chart/Minutely";
import SemiDoughnut from "./Chart/SemiDoughnut";

import ShowHistoryButton from "./Button/ShowHistoryButton";
import ViewInfo from "./Desktop/MainView";
import Wrapper from "./Wrapper";
import Alert from "./Alert";
import CompareMode from "./Button/CompareMode";

const MainView = () => {
    const [indexActive, setIndexActive] = useState(0);

    const {
        weatherState: {
            weatherData: {
                currentWeather,
                timezone,
                weeklyWeather,
                hourlyWeather,
                minutelyWeather,
            },
            dataChart,
        },
        setDataChart,
    } = useContext(WeatherContext);
    const weather = () => {
        return indexActive === 0 ? currentWeather : weeklyWeather[indexActive];
    };
    return (
        <Wrapper id="mainview">
            <CompareMode />

            <div className="flex p-3 h-full -mx-3  flex-wrap">
                <div className="w-4/5 px-3 mb-3 ">
                    <ViewInfo
                        weather={weather()}
                        indexActive={indexActive}
                        timezone={timezone}
                    />
                    <Weekly
                        indexActive={indexActive}
                        setIndexActive={setIndexActive}
                    />
                </div>

                <div className="w-1/5 px-3 mb-3 ">
                    <h3 className="text-xl font-semibold mb-3">
                        Minutely precipitation:
                    </h3>
                    <div className="w-full relative">
                        <Minutely
                            timezone={timezone}
                            minutelies={minutelyWeather}
                        />
                        {indexActive !== 0 && (
                            <Alert message="Limited API" description="" />
                        )}
                    </div>
                </div>
                <div className="w-4/5 px-3 mb-3">
                    <div className="flex items-center justify-between ">
                        <h3 className="text-xl font-semibold">
                            Hourly weather infomation:
                            <span className="ml-1 capitalize">{dataChart}</span>
                        </h3>
                        {indexActive === 0 && <ShowHistoryButton />}
                    </div>
                    <div className="w-full relative">
                        <Hourly weathers={hourlyWeather} />
                        {indexActive !== 0 && <Alert message="Limited API" />}
                    </div>
                </div>
                <div className="w-1/5 px-3 mb-3">
                    <SemiDoughnut
                        className="p-2 h-full pt-12  between flex-col"
                        name="clouds"
                        percen={weather().clouds}
                        message={weather().weather[0].description}
                        onClick={() => setDataChart("clouds")}
                    />
                </div>
            </div>
        </Wrapper>
    );
};
export default MainView;
