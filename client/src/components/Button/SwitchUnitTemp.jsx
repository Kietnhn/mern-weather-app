import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";

const SwitchUnitTemp = () => {
    const {
        settingsState: { units },
        changeUnitsTemperature,
    } = useContext(SettingsContext);
    const handleSwitchUnitTemp = () => {
        const result = units === "metric" ? "imperial" : "metric";
        changeUnitsTemperature(result);
    };
    return (
        <button
            className="relative h-8 w-20 rounded-full shadow-[0_0_5px_2px_#ccc] px-2 py-1 flex justify-between items-center"
            onClick={handleSwitchUnitTemp}
        >
            <h3 className="text-base font-semibold">C&deg;</h3>
            <h3 className="text-base font-semibold">F&deg;</h3>
            <div
                className={`absolute top-0 bottom-0 left-0 w-2/3 h-8 rounded-full shadow-[0_0_5px_2px_#ccc] theme-reverse
                center
                ${units === "metric" ? "" : "left-[unset] right-0"}
            `}
            >
                <h3 className="font-bold text-xl">
                    {units === "metric" ? "C" : "F"}&deg;
                </h3>
            </div>
        </button>
    );
};

export default SwitchUnitTemp;
