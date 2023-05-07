import useDarkMode from "../../hooks/useDarkMode";
import { Button } from "../Button";
import { LightIcon, DarkIcon } from "../icons";
function Theme() {
    const [colorTheme, setTheme] = useDarkMode();
    return (
        <div
            onClick={() => setTheme(colorTheme)}
            className="bagde  rounded-full bg-secondDark flex justify-between items-center fixed top-[20px] right-[20px]"
        >
            {colorTheme === "light" ? (
                <Button
                    className={`${
                        colorTheme === "light" &&
                        "dark:bg-active text-black duration-500"
                    }`}
                    icon={<LightIcon />}
                />
            ) : (
                <Button
                    className={`${
                        colorTheme !== "light" &&
                        "bg-active text-black duration-500"
                    }`}
                    icon={<DarkIcon />}
                />
            )}
        </div>
    );
}

export default Theme;
