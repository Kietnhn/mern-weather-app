import React, { useContext, useEffect, useState } from "react";
import AutoComplete from "../CountryStateCity/AutoComplete";
import { PositionContext } from "../../contexts/PositionContext";

const Input = ({ mode, position, setPosition }) => {
    const {
        positionState: { currentPosition },
    } = useContext(PositionContext);

    const [showAuto, setShowAuto] = useState("");
    const [input, setInput] = useState({
        country: "",
        state: "",
    });

    const handleSetInput = (e) => {
        const mode = e.target.name;
        if (mode === "country" && position.state) {
            setPosition({
                ...position,
                state: "",
            });
            setInput({
                ...input,
                [mode]: e.target.value,
                state: "",
            });
        } else {
            setInput({
                ...input,
                [mode]: e.target.value,
            });
        }
    };
    const handleClearAll = () => {
        setPosition({
            country: "",
            state: "",
            city: "",
        });
        setInput({
            country: "",
            state: "",
        });
    };
    const handleClearInput = (mode) => {
        if (mode === "country") {
            handleClearAll();
        } else {
            setPosition({
                ...position,
                [mode]: "",
            });
            setInput({
                ...input,
                [mode]: "",
            });
        }
    };
    useEffect(() => {
        if (currentPosition) {
            setInput({
                state: "",
                country: currentPosition.countryName,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPosition]);
    return (
        <div className="w-full relative">
            <input
                className={`w-full p-2  text-sm 
                rounded-full  outline-none
                lg:p-3 lg:text-xl lg:rounded-none
                `}
                onFocus={() => setTimeout(() => setShowAuto(mode.name), 500)}
                onBlur={() => setTimeout(() => setShowAuto(""), 250)}
                name={mode.name}
                placeholder={`Enter ${mode.name}...`}
                value={`${input[mode.name]}`}
                onChange={(e) => handleSetInput(e)}
            />
            {position[mode.name] && (
                <div className="absolute top-1/2 right-2 -translate-y-1/2">
                    <button
                        className="p-1 "
                        onClick={() => handleClearInput(mode.name)}
                    >
                        &times;
                    </button>
                </div>
            )}
            {showAuto === mode.name && (
                <div className="absolute left-0 right-0 top-full">
                    <AutoComplete
                        mode={showAuto}
                        input={input}
                        setInput={setInput}
                        position={position}
                        setPosition={setPosition}
                    />
                </div>
            )}
        </div>
    );
};

export default Input;
