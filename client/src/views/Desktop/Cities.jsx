import { useState, useEffect } from "react";
import ToolTip from "../../components/ToolTip";
import CitiesWeather from "../../components/CitiesWeather";
import useScroll from "../../hooks/useScroll";
const Cities = () => {
    const [isShow, setIsShow] = useState(false);
    const scrollPosition = useScroll();
    useEffect(() => {
        if (isShow) {
            setIsShow(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition]);
    return (
        <>
            {isShow ? (
                <div className="fixed top-0 bottom-0 right-0 z-[9998] min-w-[260px] theme mt-[52px] p-4">
                    <div className="absolute top-0 right-0">
                        <button
                            className="px-3 py-2 hover:cursor-pointer"
                            onClick={() => setIsShow(false)}
                        >
                            &times;
                        </button>
                    </div>
                    <CitiesWeather />
                </div>
            ) : (
                <div className="fixed top-1/2 -translate-y-1/2 right-0 z-[9999]">
                    <ToolTip
                        message="Show your cities"
                        position="-left-2 -top-1/2 -translate-x-1/2"
                        arrow={`top-1/2 right-0 translate-x-[100%] -translate-y-1/2 
                        border-[transparent_transparent_transparent_white] dark:border-[transparent_transparent_transparent_black]`}
                    >
                        <button
                            className=" px-3 py-2 theme rounded-tl-md rounded-bl-md backdrop-blur font-semibold"
                            onClick={() => setIsShow(true)}
                            style={{
                                transform: "rotate(90deg) translateY(-50%)",
                            }}
                        >
                            My cities
                        </button>
                    </ToolTip>
                </div>
            )}
        </>
    );
};

export default Cities;
