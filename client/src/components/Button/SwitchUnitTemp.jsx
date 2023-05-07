import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";

const SwitchUnitTemp = () => {
    const {
        weatherState: { unit },
        setUnitTemp,
    } = useContext(WeatherContext);
    const handleSwitchUnitTemp = () => {
        const result = unit === "C" ? "F" : "C";
        setUnitTemp(result);
    };
    return (
        <button
            className="relative h-8 w-20 rounded-full shadow-[0_0_5px_2px_#ccc] px-2 py-1 flex justify-between items-center"
            onClick={handleSwitchUnitTemp}
        >
            <h3 className="text-base font-semibold">C&deg;</h3>
            <h3 className="text-base font-semibold">F&deg;</h3>
            <div
                className={`absolute top-0 bottom-0 left-0 w-2/3 h-8 rounded-full shadow-[0_0_5px_2px_#ccc] bg-[white]
                flex items-center justify-center 
                ${unit === "C" ? "" : "left-[unset] right-0"}
            `}
            >
                <h3 className="font-bold text-xl">{unit}&deg;</h3>
            </div>
        </button>
    );
};

export default SwitchUnitTemp;
