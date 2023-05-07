import React from "react";
import CitiesWeather from "../CitiesWeather";
import DetailsInfo from "../Desktop/DetailsInfo";
import CompareChart from "../Chart/CompareChart";
import Compare from "../../components/Desktop/Compare";
const ModalCompare = ({
    weather,
    isUseWeekly = false,
    dataChart,
    weatherType = "hourlyWeather",
}) => {
    return (
        <>
            <div className="fixed left-0 right-0 top-16 bottom-0 bg-[white] px-6 z-[50]">
                <div className="relative">
                    <div className="flex w-full">
                        <div className="w-2/5 px-2">
                            <DetailsInfo
                                weather={weather}
                                weatherType={weatherType}
                            />
                        </div>
                        <div className="w-[35%] px-2">
                            <Compare />
                        </div>
                        <div className="w-1/4 px-2">
                            <h2 className="text-2xl font-semibold mb-2">
                                My Cities
                            </h2>
                            <div className="overflow-auto h-[75%] p-2">
                                <CitiesWeather />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-6 right-6 ">
                    <div className="">
                        <h3 className="text-xl font-semibold mb-4">
                            {isUseWeekly ? "Weekly" : "Hourly"} weather
                            infomation:{" "}
                            <span className="capitalize"> {dataChart}</span>
                        </h3>
                        <div className="w-full">
                            <CompareChart weatherType={weatherType} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalCompare;
