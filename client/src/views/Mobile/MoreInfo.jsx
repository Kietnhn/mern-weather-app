import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import { viewInFoDataMobile } from "../../routes/viewInfoData";
const MoreInfo = () => {
    const {
        weatherState: {
            weatherData: { currentWeather },
        },
    } = useContext(WeatherContext);
    return (
        <div className="flex flex-wrap -mx-2">
            {viewInFoDataMobile.map((item) => {
                const Icon = item.icon;
                return (
                    <div className="w-1/2 px-2 mb-4 " key={item.name}>
                        <div className="px-3 py-2 bg-transparent border rounded-xl  font-semibold between gap-4">
                            <span>
                                <Icon width="24px" height="24px" />
                            </span>
                            <div>
                                <h3 className="text-text font-normal capitalize">
                                    {item.name.split("_").join(" ")}
                                </h3>
                                <span className="text-xl ">
                                    {currentWeather[item.name]}
                                    <span
                                        className={`${
                                            item.unit === "\u00B0"
                                                ? ""
                                                : "text-sm"
                                        } ml-1`}
                                    >
                                        {item.unit}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MoreInfo;
