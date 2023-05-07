import moment from "moment-timezone";
import React, { useContext, useState } from "react";
import { WeatherContext } from "../contexts/WeatherContext";

const Calendar = () => {
    const [date] = useState(() => {
        const daysInMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
        ).getDate();
        const firstDay = new Date(
            new Date().setDate(new Date().getDate() - new Date().getDay())
        ).getDate();
        const arr = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        for (let i = 2; i < firstDay; i++) {
            arr.unshift(0);
        }
        return arr;
    });
    const {
        weatherState: {
            weatherData: { timezone, currentWeather },
        },
    } = useContext(WeatherContext);
    const [activeDays] = useState(() => {
        const today = moment.unix(currentWeather.dt).tz(timezone).format("DD");
        const arrayRange = (start, end, step) =>
            Array.from(
                { length: (end - start) / step + 1 },
                (_, i) => start + i * step
            );
        return arrayRange(+today, +today + 7, 1);
    });
    return (
        <div>
            <h2>Calendar</h2>
            <div className="w-full">
                <div className="flex -mx-2 flex-wrap mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sar"].map(
                        (day) => (
                            <div className="px-2 w-[calc(100%/7)] flex justify-center items-center font-bold">
                                {day}
                            </div>
                        )
                    )}
                </div>
                <div className="flex -mx-2 flex-wrap">
                    {date?.map((day) => (
                        <div className="px-2 w-[calc(100%/7)] flex justify-center items-center">
                            {!day ? (
                                <></>
                            ) : (
                                <div
                                    className={`p-2  ${
                                        activeDays.indexOf(day) >= 0
                                            ? "bg-text hover:cursor-pointer"
                                            : ""
                                    } `}
                                >
                                    {`${day}`.length === 1 ? `0${day}` : day}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
