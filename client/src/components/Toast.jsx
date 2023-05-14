import React from "react";
import { LocationIcon, TimesIcon } from "./icons";

const Toast = ({ type = "success", content, onClose, onClick, className }) => {
    let textColor = "text-text";
    if (type === "success") {
        textColor = "text-[#51d26d]";
    }
    return (
        <div className="fixed top-10 right-0 theme animate-fadeLeft z-[99999]">
            <div
                className={`pr-3 pl-0 py-2 hover:cursor-pointer border-l-4 ${textColor}  m-1 between font-semibold relative`}
            >
                <div className="center">
                    <span className={` px-4  ${textColor}  animate-ring`}>
                        <LocationIcon width="24px" height="24px" />
                    </span>
                </div>
                <div className={className} onClick={onClick}>
                    {content}
                </div>
                {onClose && (
                    <div className="ml-3">
                        <span
                            className={`text-text 'hover:${textColor}'`}
                            onClick={onClose}
                        >
                            <TimesIcon width="20px" height="20px" />
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Toast;
