import useDarkMode from "../../hooks/useDarkMode";
import { LightIcon, DarkIcon } from "../icons";
function Theme({ className }) {
    const [colorTheme, setTheme] = useDarkMode();
    return (
        <div className={className}>
            <div
                onClick={() => setTheme(colorTheme)}
                className=" flex justify-between items-center"
            >
                <button className="p-3 rounded-full dark:bg-secondDark bg-primaryText text-dark dark:text-primaryText  duration-200">
                    <span>
                        {colorTheme === "dark" ? <LightIcon /> : <DarkIcon />}
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Theme;
