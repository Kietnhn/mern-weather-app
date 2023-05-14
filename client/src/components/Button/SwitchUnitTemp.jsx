import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import ToolTip from "../ToolTip";

const SwitchUnitTemp = () => {
    const {
        settingsState: { units },
        changeUnitsTemperature,
    } = useContext(SettingsContext);
    const handleSwitchUnitTemp = () => {
        // metric === celsius, imperial === fahrenheit
        const result = units === "metric" ? "imperial" : "metric";
        changeUnitsTemperature(result);
    };
    return (
        <ToolTip
            message={`Change to ${
                units !== "metric" ? "Celsius" : "Fahrenheit"
            }`}
            position="top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2"
            arrow="top-0 -translate-y-full left-1/2 -translate-x-1/2 border-[transparent_transparent_white_transparent] dark:border-[transparent_transparent_black_transparent]"
        >
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
                    <h3 className="font-bold h-full w-full text-xl">
                        {units === "metric" ? "C" : "F"}&deg;
                    </h3>
                </div>
            </button>
        </ToolTip>
    );
};

export default SwitchUnitTemp;
