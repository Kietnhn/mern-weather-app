import { TemperatureIcon } from "../../icons";

function Unit({ className }) {
    return (
        <>
            <li className={className}>
                <div className="flex justify-start items-center gap-2">
                    <span>
                        <TemperatureIcon width="20px" height="20px" />
                    </span>
                    <span className="text-xl">Unit</span>
                </div>
                <div className="hidden">
                    <div className="flex justify-start items-center gap-2">
                        <span>&deg;C</span>
                        <span className="text-xl">Celsius</span>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <span>&deg;F</span>
                        <span className="text-xl">Fahrenheit</span>
                    </div>
                </div>
            </li>
        </>
    );
}

export default Unit;
