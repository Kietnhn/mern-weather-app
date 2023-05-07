import React, { useState } from "react";
// import navs from "../../routes/navigate";
import today from "../../routes/today";
import ToolTip from "../../components/ToolTip";
// import { NavLink } from "react-router-dom";
const Navigation = () => {
    const [isActive, setIsActive] = useState(0);
    const handleScrollToComponent = (link, index) => {
        const comp = document.querySelector(link);
        comp.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsActive(index);
    };
    return (
        <div className="fixed top-1/2 -translate-y-1/2 left-0  z-[9999]">
            <div className="p-2 flex-col between theme font-semibold navtoday">
                {today.map((i, index) => {
                    const Icon = i.icon;
                    return (
                        <div
                            key={i.title}
                            onClick={(e) =>
                                handleScrollToComponent(i.link, index)
                            }
                        >
                            <ToolTip
                                message={`Move to ${i.title}`}
                                position="left-full top-1/2 -translate-y-1/2 translate-x-[4px]"
                                arrow={`top-1/2 left-0 translate-x-[-100%] -translate-y-1/2 
                             border-[transparent_white_transparent_transparent] dark:border-[transparent_black_transparent_transparent]`}
                            >
                                <button
                                    className={`px-3 py-2 ${
                                        index === isActive
                                            ? "text-theme"
                                            : "text-[#ccc]"
                                    }`}
                                >
                                    <Icon width="24px" height="24px" />
                                </button>
                                {/* <div className="navtoday-item between gap-2 p-2  hover:cursor-pointer">
                                    <p className="w-[100px] text-end">
                                        {i.title}
                                    </p>
                                </div> */}
                            </ToolTip>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Navigation;
