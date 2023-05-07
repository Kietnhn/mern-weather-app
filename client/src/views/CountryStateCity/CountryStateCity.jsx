import { useState, useEffect, useContext } from "react";
import { InfoIcon } from "../../components/icons";
import { Country, State, City } from "country-state-city";
import { WeatherContext } from "../../contexts/WeatherContext";
import { useNavigate } from "react-router-dom";
import filterListByName from "../../utils/filterListByName";
const CountryStateCity = ({ position }) => {
    const [positions, setPositions] = useState(null);
    const [showMoreInfo, setShowMoreInfo] = useState("");
    const { getWeatherData, setCompare } = useContext(WeatherContext);

    const navigate = useNavigate();

    const handleSelectPosition = async ({ latitude, longitude }) => {
        const lat = latitude;
        const lon = longitude;
        const weatherData = await getWeatherData({ lat, lon });
        setCompare([{ ...weatherData }]);
        navigate("/today");
    };
    const handleSetShowMoreInfo = (e, name) => {
        e.stopPropagation();
        if (name === showMoreInfo) {
            setShowMoreInfo("");
        }
        setShowMoreInfo(name);
    };
    const handleFilter = (list, subString) => {
        const customString = subString?.trim();
        if (customString) {
            return filterListByName(list, customString);
        }
        return list;
    };

    const Position = ({ position }) => {
        return (
            <div
                className="between bg-[white] shadow-lg px-3 py-2 hover:cursor-pointer"
                onClick={() => handleSelectPosition(position)}
            >
                <h2 className="font-semibold max-h-[24px] overflow-hidden ">
                    {position?.name}
                </h2>
                <div className="relative center">
                    <button
                        onClick={(e) => handleSetShowMoreInfo(e, position.name)}
                        onBlur={() => setShowMoreInfo("")}
                    >
                        <span>
                            <InfoIcon width="20px" height="20px" />
                        </span>
                    </button>
                    {showMoreInfo === position?.name && (
                        <div className="absolute top-full right-0 font-semibold text-sm theme z-[55]">
                            {["name", "latitude", "longitude"].map((item) => (
                                <div className="flex items-center px-2 gap-1">
                                    <h3 className="capitalize">{item}:</h3>
                                    <p>{position[item]}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };
    useEffect(() => {
        const { country, state, city } = position;
        if (country && state) {
            setPositions(() => {
                const list = City.getCitiesOfState(country, state);
                return handleFilter(list, city);
            });
        } else if (country) {
            setPositions(() => {
                const list = State.getStatesOfCountry(country);
                return handleFilter(list, state);
            });
        } else {
            setPositions(() => Country.getAllCountries());
        }
    }, [position]);

    if (!positions) return <></>;
    return (
        <div className="w-full">
            {position.country && (
                <div key={position.country}>
                    <h2>Country:</h2>
                    <div className="w-1/5 px-2 mb-2">
                        <Position
                            position={Country.getCountryByCode(
                                position.country
                            )}
                        />
                    </div>
                </div>
            )}
            {position.country && position.state && (
                <div>
                    <h2>States of Country:</h2>
                    <div className="w-1/5 px-2 mb-2" key={position.state}>
                        <Position
                            position={State.getStateByCodeAndCountry(
                                position.state,
                                position.country
                            )}
                        />
                    </div>
                </div>
            )}
            <div className="flex flex-wrap -mx-2">
                {positions.map((position) => (
                    <div className="w-1/5 px-2 mb-2" key={position.name}>
                        <Position position={position} />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CountryStateCity;
