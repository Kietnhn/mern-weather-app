import React, { useContext, useEffect, useRef, useState } from "react";
import { PositionContext } from "../../contexts/PositionContext";
import { Country, State } from "country-state-city";
import { ChevronDownIcon, SearchIcon } from "../../components/icons";
import { useNavigate } from "react-router-dom";
import { WeatherContext } from "../../contexts/WeatherContext";
import getFlagUrlByIsoCode from "../../utils/getFlagByIsoCode";

const SearchCountryState = ({ size = "normal" }) => {
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
    const countryRef = useRef();
    const positionRef = useRef();
    const autoCompleteContryRef = useRef();
    const navigate = useNavigate();
    // function
    const handleSetCountry = (country) => {
        setCountry(country);
        autoCompleteContryRef.current.classList.toggle("show");

        setInput("");

        positionRef.current.focus();
    };

    const handleChangeInput = (e) => {
        // if (!country) {
        //     selectRef.current.focus();
        //     return;
        // }
        autoCompleteContryRef.current.classList.toggle("show");

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
        console.log({ position });
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
            const customPosition = {
                ...currentPosition,
                isoCode: currentPosition.countryCode,
            };
            setCountry(customPosition);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPosition]);
    useEffect(() => {
        const states = State.getStatesOfCountry(country.isoCode);
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
            <div
                ref={countryRef}
                className="absolute left-0 top-1/2  -translate-y-1/2 h-full z-40 border-r-2 group"
            >
                <button
                    className={` h-full ${
                        size === "small" ? "min-w-[130px]" : "min-w-[160px]"
                    } px-4 between`}
                    onClick={() =>
                        autoCompleteContryRef.current.classList.toggle("show")
                    }
                >
                    {country && (
                        <>
                            <span className="center gap-2">
                                <span className="font-semibold ">
                                    {country?.isoCode}
                                </span>
                                -
                                <img
                                    alt={country.name}
                                    src={getFlagUrlByIsoCode(country?.isoCode)}
                                />
                            </span>
                            <span>
                                <ChevronDownIcon width="16px" height="16px" />
                            </span>
                        </>
                    )}
                </button>
                <div
                    className="hidden absolute top-full left-0 right-0 theme max-h-[360px] overflow-auto"
                    ref={autoCompleteContryRef}
                >
                    {Country.getAllCountries().map((ctr) => (
                        <span
                            key={ctr.isoCode}
                            value={ctr.isoCode}
                            className={`text-sm block px-4 hover:bg-text hover:cursor-pointer overflow-x-hidden ${
                                country?.isoCode === ctr.isoCode
                                    ? "theme-reverse"
                                    : ""
                            }`}
                            onClick={() => handleSetCountry(ctr)}
                        >
                            <span className="block whitespace-nowrap hover:-translate-x-1/2 duration-[4s]">
                                {ctr.isoCode} - {ctr.name}
                            </span>
                        </span>
                    ))}
                </div>
                {/* <select
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
                </select> */}
            </div>
            <div className="relative">
                <input
                    ref={positionRef}
                    className={`w-full ${
                        size === "small" ? "p-1" : "p-4"
                    }  font-semibold rounded-full  border-2 border-theme  theme`}
                    style={{
                        paddingLeft: `${
                            countryRef.current?.clientWidth + 16
                        }px`,
                    }}
                    placeholder="Enter place..."
                    value={input}
                    onChange={(e) => handleChangeInput(e)}
                    onKeyDown={hanldeEnterToSearch}
                    onFocus={() => {
                        setTimeout(() => {
                            setIsShowAuto(true);
                        }, 200);
                    }}
                    onBlur={() => setTimeout(() => setIsShowAuto(false), 250)}
                />
                {isShowAuto && (
                    <div
                        className="absolute top-full z-40 right-0"
                        style={{
                            left: `${countryRef.current?.clientWidth + 16}px`,
                        }}
                    >
                        {" "}
                        <div className="max-h-[360px] overflow-auto theme">
                            {autoComplete.map((state) => (
                                <div
                                    key={state.isoCode}
                                    onClick={() =>
                                        handleClickAutoComplete(state)
                                    }
                                    className="hover:cursor-pointer hover:bg-text px-4 overflow-x-hidden "
                                >
                                    <span className="block whitespace-nowrap hover:-translate-x-1/2 duration-[4s]">
                                        {state.isoCode} - {state.name}
                                    </span>
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
