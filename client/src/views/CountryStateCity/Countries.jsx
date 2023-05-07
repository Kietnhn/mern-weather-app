import { useState } from "react";
import { InfoIcon } from "../icons";
import { Country } from "country-state-city";

const Countries = ({ countryCode }) => {
    const [countries] = useState(() => {
        const countries = Country.getAllCountries();
        if (countryCode) {
            return countries.filter((country) =>
                country.name.includes(countryCode)
            );
        }
        return countries;
    });
    return (
        <div className="w-full">
            <div className="flex flex-wrap -mx-2">
                {countries.map((state) => (
                    <div className="w-1/5 px-2 mb-2" key={state.name}>
                        <div className="between bg-[white] shadow-lg px-3 py-2">
                            <h2 className="font-semibold max-h-[48px] overflow-hidden ">
                                {state.name}
                            </h2>
                            <div>
                                <button>
                                    <span>
                                        <InfoIcon />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Countries;
