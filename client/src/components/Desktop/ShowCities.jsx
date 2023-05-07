import React, { useContext, useState } from "react";
import { ChevronLeftIcon } from "../icons";
import CitiesWeather from "../CitiesWeather";
import { WeatherContext } from "../../contexts/WeatherContext";
const ShowCities = () => {
    const {
        setIsCompare,
        setCompare,
        weatherState: { isCompare, weatherData },
    } = useContext(WeatherContext);
    const [showCities, setShowCities] = useState(false);

    return (
        <>
            {showCities ? (
                <div className="fixed top-0 bottom-0 right-0 w-[360px] p-8 z-50 bg-[rgba(0,0,0,0.4)]">
                    <button
                        className="p-4 absolute top-0 right-0"
                        onClick={() => setShowCities(false)}
                    >
                        &times;
                    </button>
                    <div className="">
                        <h1 className="mb-2 text-center text-4xl font-semibold">
                            My Cities
                        </h1>
                        <div className="mb-6 flex justify-between items-center">
                            {/* <button
                                className={`px-4 py-2 rounded-full  border-2 duration-150 hover:bg-[white] font-bold `}
                                onClick={handleSelectedCompare}
                            >
                                {!isCompare ? "Compare Mode" : "Exit"}
                            </button> */}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="fixed top-1/2 right-0">
                    <button
                        className="flex rotate-[270deg] relative px-4 py-2 rounded-full border-2"
                        onClick={() => setShowCities(true)}
                    >
                        <span className="absolute">
                            <ChevronLeftIcon />
                        </span>
                        <span>Show Cities</span>
                    </button>
                </div>
            )}
        </>
    );
};

export default ShowCities;
