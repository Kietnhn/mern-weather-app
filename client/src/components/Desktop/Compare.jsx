import { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import { TimesIcon } from "../icons";
const Compare = () => {
    const {
        weatherState: { compare },
        setCompare,
    } = useContext(WeatherContext);
    const handleRemoveCompare = (index) => {
        if (compare.length > 1) {
            const deletedCompare = compare.filter((_, i) => i !== index);
            setCompare(deletedCompare);
        }
    };
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2">Comparing: </h2>
            <div className="flex gap-2 w-full flex-wrap">
                {compare?.map((weather, index) => (
                    <div
                        className="relative button font-semibold"
                        key={`compare ${weather.timezone}`}
                    >
                        <h2>{weather.timezone}</h2>
                        <div className="absolute top-0 right-0 flex">
                            <button onClick={() => handleRemoveCompare(index)}>
                                <span>
                                    <TimesIcon width="14px" height="14px" />
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Compare;
