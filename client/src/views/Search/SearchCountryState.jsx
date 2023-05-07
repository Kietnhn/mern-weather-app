import React, { useContext, useEffect, useRef, useState } from "react";
import { PositionContext } from "../../contexts/PositionContext";
import { Country, State } from "country-state-city";
import { SearchIcon } from "../../components/icons";
import { useNavigate } from "react-router-dom";
import { WeatherContext } from "../../contexts/WeatherContext";

const SearchCountryState = () => {
    const {
        positionState: { currentPosition },
    } = useContext(PositionContext);
    const {
        getWeatherData,
        getCompareWeatherData,
        weatherState: { compare, isCompare },
    } = useContext(WeatherContext);
    const [country, setCountry] = useState("");
    const [input, setInput] = useState("");
    const [position, setPosition] = useState(null);
    const [autoComplete, setAutoComplete] = useState([]);
    const [isShowAuto, setIsShowAuto] = useState(false);
    const selectRef = useRef();
    const positionRef = useRef();
    const navigate = useNavigate();
    // function
    const handleSetCountry = (e) => {
        setCountry(e.target.value);
        positionRef.current.focus();
    };

    const handleChangeInput = (e) => {
        if (!country) {
            selectRef.current.focus();
            return;
        }
        setInput(e.target.value);
    };
    const handleAddCompare = async ({ lat, lon }) => {
        const existedCity = compare.find(
            (city) => city.lat === lat && city.lon === lon
        );
        if (!existedCity) {
            await getCompareWeatherData({ lat, lon });
        }
    };
    const handleClickAutoComplete = (state) => {
        setInput(state.name);
        setTimeout(() => {
            setPosition(state);
        }, 500);
    };
    const hanldeEnterToSearch = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    const handleSearch = async () => {
        if (!position) return;
        const lat = position.latitude;
        const lon = position.longitude;
        if (isCompare) {
            await handleAddCompare({ lat, lon });
        } else {
            await getWeatherData({ lat, lon });
            navigate("/today");
        }
    };
    useEffect(() => {
        if (currentPosition) {
            selectRef.current.value = currentPosition.countryCode;
            setCountry(currentPosition.countryCode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPosition]);
    useEffect(() => {
        const states = State.getStatesOfCountry(country);
        if (input) {
            setAutoComplete(
                states.filter((state) =>
                    state.name.toLowerCase().includes(input.toLowerCase())
                )
            );
        } else {
            setAutoComplete(states);
        }
    }, [country, input]);
    return (
        <div className="relative">
            <div className="absolute left-0 top-1/2  -translate-y-1/2 h-full z-40 ">
                <select
                    ref={selectRef}
                    name="country"
                    onChange={handleSetCountry}
                    className="outline-none font-semibold h-full px-4 rounded-l-full  border-2 border-theme"
                >
                    {Country.getAllCountries().map((country) => (
                        <option
                            key={country.isoCode}
                            value={country.isoCode}
                            className="text-sm"
                        >
                            {country.isoCode} - {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="relative">
                <input
                    ref={positionRef}
                    className={`w-full p-4  font-semibold rounded-full  border-2 border-theme`}
                    style={{
                        paddingLeft: `${selectRef.current?.clientWidth + 16}px`,
                    }}
                    placeholder="Enter place..."
                    value={input}
                    onChange={(e) => handleChangeInput(e)}
                    onKeyDown={hanldeEnterToSearch}
                    onFocus={() => setTimeout(() => setIsShowAuto(true), 500)}
                    onBlur={() => setTimeout(() => setIsShowAuto(false), 250)}
                />
                {isShowAuto && (
                    <div
                        className="absolute top-full z-40 right-0"
                        style={{
                            left: `${selectRef.current?.clientWidth + 16}px`,
                        }}
                    >
                        {" "}
                        <div className="max-h-[300px] overflow-auto theme">
                            {autoComplete.map((state) => (
                                <div
                                    key={state.isoCode}
                                    onClick={() =>
                                        handleClickAutoComplete(state)
                                    }
                                    className="hover:cursor-pointer hover:bg-text px-4 "
                                >
                                    {state.isoCode} - {state.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <button
                className="absolute top-[50%] right-4 -translate-y-1/2 "
                onClick={handleSearch}
                disabled={!position}
            >
                <span>
                    <SearchIcon width="20px" height="20px" />
                </span>
            </button>
        </div>
    );
};

export default SearchCountryState;
