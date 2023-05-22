import React from "react";
import ToolTip from "../ToolTip";
import useDarkMode from "../../hooks/useDarkMode";
import { DarkIcon, LightIcon } from "../icons";

const SwitchTheme = () => {
    const [colorTheme, setTheme] = useDarkMode();

    return (
        <ToolTip
            message={`${colorTheme === "dark" ? "Light Theme" : "Dark Theme"}`}
            position="top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2"
            arrow="top-0 -translate-y-full left-1/2 -translate-x-1/2 border-[transparent_transparent_white_transparent] dark:border-[transparent_transparent_black_transparent]"
        >
            <button
                className="relative h-8 w-20 rounded-full shadow-[0_0_5px_2px_#ccc] px-2 py-1 between"
                onClick={() => setTheme(colorTheme)}
            >
                <h3 className="text-base font-semibold">
                    <span>
                        <LightIcon />
                    </span>
                </h3>
                <h3 className="text-base font-semibold">
                    <span>
                        <DarkIcon />
                    </span>
                </h3>
                <div
                    className={`absolute top-0 bottom-0 left-0 w-2/3 h-8 rounded-full shadow-[0_0_5px_2px_#ccc] theme-reverse
                center
                ${colorTheme === "dark" ? "left-[unset] right-0" : ""}
            `}
                >
                    <h3 className="font-bold h-full w-full text-xl">
                        <span className="h-full w-full center">
                            {colorTheme === "dark" ? (
                                <DarkIcon />
                            ) : (
                                <LightIcon />
                            )}
                        </span>
                    </h3>
                </div>
            </button>
        </ToolTip>
    );
};

export default SwitchTheme;
