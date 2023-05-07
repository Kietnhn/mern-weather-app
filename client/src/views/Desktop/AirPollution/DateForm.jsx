import moment from "moment-timezone";
import React, { useContext, useState } from "react";
import { WeatherContext } from "../../../contexts/WeatherContext";
import { AirContext } from "../../../contexts/AirContext";

const DateForm = () => {
    const {
        weatherState: {
            weatherData: { lat, lon },
        },
    } = useContext(WeatherContext);
    const { getHistoryAirPollution } = useContext(AirContext);
    const [inputs, setInputs] = useState({
        start: "",
        end: "",
    });

    const handleSetInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };
    const handleValidateDate = (e) => {
        const value = e.target.value;
        const isValid = moment(value, "YYYY-MM-DD", true).isValid();
        if (!isValid) {
            e.target.focus();
        }
    };
    const handleGetHistoryAirPollution = async () => {
        const { start, end } = inputs;
        if (start && end) {
            const start = new Date(inputs.start);

            const end = new Date(inputs.end);
            start.setHours(0, 0, 0);
            end.setHours(0, 0, 0);
            const startUTC = Math.floor(start.getTime() / 1000);
            const endUTC = Math.floor(end.getTime() / 1000);
            console.log({ start: startUTC, end: endUTC });
            await getHistoryAirPollution({
                start: startUTC,
                end: endUTC,
                lat,
                lon,
            });
        }
    };
    return (
        <div className="w-full between -mx-3">
            {[...Object.keys(inputs)].map((input, index) => (
                <div className="w-2/5 px-3" key={index}>
                    <div className="relative">
                        <input
                            className="w-full py-2 px-3 text-[black]"
                            placeholder={`Enter ${input} time`}
                            value={inputs[input] || ""}
                            onBlur={handleValidateDate}
                            onChange={handleSetInput}
                            name={`${input}`}
                        />
                        <div className="absolute right-0 top-0 bottom-0">
                            <input
                                className="w-[44px] h-full px-3 hover:cursor-pointer"
                                type="date"
                                onChange={handleSetInput}
                                name={`${input}`}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex-1 px-3">
                <button
                    className="button"
                    onClick={handleGetHistoryAirPollution}
                >
                    Get History
                </button>
            </div>
        </div>
    );
};

export default DateForm;
