import React, { useContext } from "react";
import ToolTip from "../ToolTip";
import { CompareIcon } from "../icons";
import { useNavigate } from "react-router-dom";
import { WeatherContext } from "../../contexts/WeatherContext";
const CompareMode = () => {
    const { setIsCompare } = useContext(WeatherContext);
    const navigate = useNavigate();
    const handleToggleCompareMode = () => {
        setIsCompare(true);
        navigate("/comparative");
    };
    return (
        <div className="hidden md:block absolute right-0 top-[100px] z-[9999]">
            <ToolTip
                message="Compare Mode"
                position="left-[calc(-100%-8px)] top-0 -translate-x-1/2"
                arrow={`top-1/2 right-0 translate-x-[100%] -translate-y-1/2 
                  border-[transparent_transparent_transparent_white] dark:border-[transparent_transparent_transparent_black]`}
            >
                <button
                    className="p-3 rounded-full theme"
                    onClick={handleToggleCompareMode}
                >
                    <span>
                        <CompareIcon width="20px" height="20px" />
                    </span>
                </button>
            </ToolTip>
        </div>
    );
};

export default CompareMode;
