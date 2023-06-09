import { useState, useEffect, useContext, forwardRef } from "react";
import LoadingComponent from "../Loading/LoadingComponent";
import Wrapper from "../Wrapper";
import { AirContext } from "../../contexts/AirContext";
import { WeatherContext } from "../../contexts/WeatherContext";
import Current from "./Current";
import History from "./History";
import Forecast from "./Forecast";
const AirPollution = forwardRef((_, ref) => {
    const [mode, setMode] = useState("current");

    const {
        airState: { current, airLoading },
        getCurrentAirPollution,
    } = useContext(AirContext);
    const {
        weatherState: { weatherData },
    } = useContext(WeatherContext);

    const handleSetMode = (mode) => {
        setMode(mode);
    };
    const renderProps = () => {
        const { lat, lon, timezone } = weatherData;
        if (mode === "forecast") {
            return <Forecast lat={lat} lon={lon} timezone={timezone} />;
        }
        if (mode === "history") return <History timezone={timezone} />;
        return <>{current && <Current current={current} />}</>;
    };

    useEffect(() => {
        const { lat, lon } = weatherData;
        getCurrentAirPollution({ lat, lon });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weatherData]);
    return (
        <Wrapper
            ref={ref}
            title="Air Pollution"
            id="airpollution"
            styleTitle="hidden sm:block font-bold text-4xl text-center  mb-5"
        >
            <div className="w-full lg:px-5 lg:py-3">
                <div className="flex flex-wrap-reverse -mx-3">
                    <div className="w-full lg:w-4/5 px-3">
                        {airLoading ? (
                            <LoadingComponent className="w-full h-full relative" />
                        ) : (
                            renderProps()
                        )}
                    </div>
                    <div className="w-full lg:w-1/5 px-3 mb-3 lg:mb-0">
                        <div className="flex between  lg:flex-col ">
                            {["current", "history", "forecast"].map((item) => (
                                <div
                                    key={item}
                                    className="w-1/3 lg:px-3 sm:px-5 sm:w-full sm:mb-3"
                                >
                                    <button
                                        onClick={() => handleSetMode(item)}
                                        className={`sm:w-full capitalize ${
                                            mode === item
                                                ? "button-reverse"
                                                : " button"
                                        }`}
                                    >
                                        {item}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
});
export default AirPollution;
