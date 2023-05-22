import { useEffect } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import ToolTip from "../ToolTip";
import { LightIcon, DarkIcon } from "../icons";
function Theme({ className }) {
    const [colorTheme, setTheme] = useDarkMode();

    return (
        <div className={className}>
            <div onClick={() => setTheme(colorTheme)} className="center">
                <ToolTip
                    message={`${
                        colorTheme === "dark" ? "Light Theme" : "Dark Theme"
                    }`}
                    position="top-1/2 translate-y-full left-1/2 -translate-x-1/2"
                    arrow="top-0 -translate-y-full left-1/2 -translate-x-1/2 
                    border-[transparent_transparent_white_transparent] dark:border-[transparent_transparent_black_transparent]"
                >
                    <button className="p-3 rounded-full theme bg-[transparent!important] border-theme border-2 duration-200">
                        <span>
                            {colorTheme === "dark" ? (
                                <LightIcon />
                            ) : (
                                <DarkIcon />
                            )}
                        </span>
                    </button>
                </ToolTip>
            </div>
        </div>
    );
}

export default Theme;
