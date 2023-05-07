import React from "react";
import { WarmingIcon } from "./icons";

const Alert = ({
    message,
    type = "warming",
    description = "Sorry we can't show this infomation",
}) => {
    let Icon;
    if (type === "warming") {
        Icon = WarmingIcon;
    }
    return (
        <div className="absolute inset-2 shadow-[0_0_8px_8px_#ccc] bg-[rgba(0,0,0,.3)] backdrop-blur">
            <div className="absolute-center min-width-[180px]">
                <div className="theme rounded-lg center flex-col px-3 py-2">
                    <div className="center gap-2">
                        <span
                            className={
                                type === "warming" ? "text-[#ffcd74]" : ""
                            }
                        >
                            <Icon width="24px" height="24px" />
                        </span>
                        <h2 className="font-bold uppercase">{message}</h2>
                    </div>
                    <p className="font-semibold">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Alert;
