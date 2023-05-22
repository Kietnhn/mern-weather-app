import React, { useEffect, useState } from "react";
// import navs from "../../routes/navigate";
import today from "../../routes/today";
import ToolTip from "../../components/ToolTip";
import scrollToComponet from "../../utils/scrollToComponent";
// import { NavLink } from "react-router-dom";
const Navigation = ({ listRef = [] }) => {
    const [isActive, setIsActive] = useState(0);
    const handleScrollToComponent = (link) => {
        scrollToComponet(link);
    };
    useEffect(() => {
        const isInViewIndex = listRef.findLastIndex(
            (isInView) => isInView === true
        );
        setIsActive(isInViewIndex);
    }, [listRef]);
    const renderNavigation = () => {
        return (
            <div className="p-2 modal-content flex-col between  font-semibold navtoday">
                {today.map((i, index) => {
                    const Icon = i.icon;
                    return (
                        <div
                            key={i.title}
                            onClick={() => handleScrollToComponent(i.link)}
                        >
                            <ToolTip
                                message={`Move to ${i.title}`}
                                position="left-full top-1/2 -translate-y-1/2 translate-x-[4px]"
                                arrow={`top-1/2 left-0 translate-x-[-100%] -translate-y-1/2 
                             border-[transparent_white_transparent_transparent] dark:border-[transparent_black_transparent_transparent]`}
                            >
                                <button
                                    className={`px-3 py-2 text-[#ccc] ${
                                        index === isActive ? "text-theme" : ""
                                    } ${i.link.replace("#", "")}`}
                                >
                                    <Icon width="24px" height="24px" />
                                </button>
                            </ToolTip>
                        </div>
                    );
                })}
            </div>
        );
    };
    return (
        <div className="fixed   top-1/2 -translate-y-1/2 left-0  z-[9999]">
            <div className="hidden xl:block">{renderNavigation()}</div>
            <div className="hidden lg:block xl:hidden group">
                <div className="block group-hover:hidden">
                    <button
                        className="px-3 py-2 modal-content rounded-tl-md rounded-bl-md backdrop-blur font-semibold"
                        style={{
                            transform: "rotate(270deg) translateY(-50%)",
                        }}
                    >
                        Move
                    </button>
                </div>
                <div className="hidden group-hover:block">
                    {renderNavigation()}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
