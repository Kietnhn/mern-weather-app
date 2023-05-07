import { useState, useEffect } from "react";
import { Country, State } from "country-state-city";
import filterListByName from "../../utils/filterListByName";
const AutoComplete = ({ position, mode, setPosition, input, setInput }) => {
    const [positions, setPositions] = useState(null);
    const handleSetPosition = (ps) => {
        setPosition({
            ...position,
            [mode]: ps.isoCode,
        });
        setInput({
            ...input,
            [mode]: ps.name,
        });
    };

    useEffect(() => {
        const handleFilter = (list, string) => {
            const customString = string.trim();
            if (customString) {
                return filterListByName(list, customString);
            }
            return list;
        };
        setPositions(() => {
            if (mode === "state") {
                const state = State.getStatesOfCountry(position.country);
                return handleFilter(state, input.state);
            } else {
                const country = Country.getAllCountries();
                return handleFilter(country, input.country);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    if (!positions) return <></>;
    return (
        <>
            {positions.map((position) => (
                <div
                    className="w-full flex px-3 py-2 hover:bg-[#ccc] mb-1 hover:cursor-pointer"
                    key={`autocomplete ${position.name}`}
                    onClick={() => handleSetPosition(position)}
                >
                    <h2>
                        {position?.countryCode
                            ? `${position.countryCode} - `
                            : ""}
                        {position.name}-
                        {position?.isoCode ? ` ${position.isoCode}` : ""}
                    </h2>
                </div>
            ))}
        </>
    );
};
export default AutoComplete;
