import React, { useContext, useEffect } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
// import moment from "moment-timezone";
import history from "../../routes/history";
import { ChevronDownIcon } from "../icons";
const ShowHistoryButton = () => {
    const {
        weatherState: { historyWeather, weatherData },
        // getHistoryWeather,
        getHistoryWeather2_5,
        setHistoryWeather,
    } = useContext(WeatherContext);

    const handleGetHistoryWeather = async (e, { datetime, prop }) => {
        // prevent double or more click
        e.target.disabled = true;
        setTimeout(() => {
            e.target.disabled = false;
        }, [5000]);
        const {
            lat,
            lon,
            timezone,
            currentWeather: { dt },
        } = weatherData;
        if (e.target.checked) {
            const history = await getHistoryWeather2_5({
                lat,
                lon,
                dt: dt - datetime,
                timezone,
                datetime,
            });
            setHistoryWeather({ ...historyWeather, [`${prop}`]: history });
        } else {
            // unset
            setHistoryWeather({ ...historyWeather, [`${prop}`]: null });
        }
    };
    const handleClearAllHistoryWeather = () => {
        // reset
        setHistoryWeather({
            history1_day: null,
            history3_day: null,
            history5_day: null,
            history7_day: null,
        });
    };
    useEffect(() => {
        handleClearAllHistoryWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weatherData]);
    return (
        <div className="relative history group">
            <h3 className="center gap-2 font-semibold px-3 py-2 shadow-md">
                History
                <span className="">
                    <ChevronDownIcon width="20px" height="20px" />
                </span>
            </h3>
            <div className="absolute theme hidden group-hover:block top-[90%]  right-0 min-w-[140px] z-[99999]">
                <div className="p-2">
                    {history.map((item, index) => {
                        const { title, prop, datetime } = item;
                        return (
                            <div key={index} className="between px-2 py-1 ">
                                <input
                                    type="checkbox"
                                    id={title}
                                    onChange={(e) =>
                                        handleGetHistoryWeather(e, {
                                            datetime,
                                            prop,
                                        })
                                    }
                                    checked={
                                        historyWeather[prop] ? true : false
                                    }
                                />
                                <label
                                    htmlFor={title}
                                    className="font-semibold capitalize hover:cursor-pointer"
                                >
                                    {title}
                                </label>
                            </div>
                        );
                    })}
                    <div className="mt-1 border-t px-2 py-1">
                        <button
                            onClick={handleClearAllHistoryWeather}
                            className="w-full text-center"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowHistoryButton;
