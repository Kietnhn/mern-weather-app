import React, { useContext, useState } from "react";
import { PositionContext } from "../../contexts/PositionContext";
import { WeatherContext } from "../../contexts/WeatherContext";
import { ClearInputIcon, SendIcon } from "../../components/icons";
import ToolTip from "../../components/ToolTip";
let getAutoCompleteTimeout;
const SearchMap = ({ map, zoom, setWeatherOnMap }) => {
    const { getCurrentWeatherData } = useContext(WeatherContext);
    const { getPosition, getPositionByLatLon } = useContext(PositionContext);
    const [isShowAuto, setIsShowAuto] = useState(false);
    const [search, setSearch] = useState("");
    const [autoComplete, setAutoComplete] = useState([]);
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        clearTimeout(getAutoCompleteTimeout);

        getAutoCompleteTimeout = setTimeout(async () => {
            if (value) {
                const positions = await getPosition(value);
                setAutoComplete(positions);
            }
        }, 1000);
    };
    const handleClickButtonSearch = () => {
        if (search) {
            const position = autoComplete[0];
            if (position) {
                handleChange(position);
            }
        }
    };
    const handleChange = async (position) => {
        const { lat, lon, name } = position;
        map.setView([lat, lon], zoom);
        const newPosition = await getCurrentWeatherData({ lat, lon });
        await getPositionByLatLon({ lat, lon });
        setWeatherOnMap(newPosition);
        setSearch(name);
    };
    return (
        <div className="relative ">
            <div className="">
                <input
                    className="p-2 pr-10 theme w-full"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                    onFocus={() => {
                        setTimeout(() => {
                            setIsShowAuto(true);
                        }, 200);
                    }}
                    onBlur={() => setTimeout(() => setIsShowAuto(false), 250)}
                />
            </div>

            {search && (
                <div className="absolute top-1/2 -translate-y-1/2 right-10">
                    <ToolTip
                        message="Clear"
                        position="top-[-100%] -translate-y-[100%] left-1/2 -translate-x-1/2"
                    >
                        <button className="flex" onClick={() => setSearch("")}>
                            <span>
                                <ClearInputIcon width="14px" height="14px" />
                            </span>
                        </button>
                    </ToolTip>
                </div>
            )}
            <div className="absolute top-0 bottom-0 right-0">
                <ToolTip
                    message={`${search ? `Move to ${search}` : ""}`}
                    position={`${
                        search
                            ? "top-0 -translate-y-[100%] left-1/2 -translate-x-1/2"
                            : "hide"
                    }`}
                >
                    <button
                        className="w-10 h-10 theme p-2 center"
                        onClick={handleClickButtonSearch}
                        disabled={search ? true : false}
                    >
                        <span>
                            <SendIcon width="18px" height="18px" />
                        </span>
                    </button>
                </ToolTip>
            </div>
            {/* autocomplete */}
            {isShowAuto && (
                <div className="absolute top-full left-0 right-0">
                    <div>
                        {autoComplete.map((position) => {
                            return (
                                <div
                                    className="px-2 theme hover:bg-text hover:cursor-pointer"
                                    key={position.id}
                                    onClick={() => handleChange(position)}
                                >
                                    {position.country} - {position.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchMap;
