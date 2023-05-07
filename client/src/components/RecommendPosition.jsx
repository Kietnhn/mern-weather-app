import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import { useNavigate } from "react-router-dom";
import { LocationIcon, TimesIcon } from "./icons";
import { PositionContext } from "../contexts/PositionContext";
const RecommendPosition = () => {
    const { getWeatherData, setCompare } = useContext(WeatherContext);
    const {
        positionState: { currentPosition },
    } = useContext(PositionContext);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    const handleSetCurrentWeather = async () => {
        const lat = currentPosition.latitude;
        const lon = currentPosition.longitude;
        await getWeatherData({ lat, lon });
        setShowToast(false);
        navigate("/today");
    };

    useEffect(() => {
        if (currentPosition) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 7000);
        }
    }, [currentPosition]);
    if (!currentPosition) return <></>;
    // add animate fade left
    return (
        <>
            {showToast && (
                <div className="fixed top-10 right-0 bg-[white] animate-fadeLeft">
                    <div className="pr-3 pl-0 py-2 hover:cursor-pointer border-l-4 border-[#51d26d] m-1 between font-semibold relative">
                        <div className="center">
                            <span className=" px-4  text-[#51d26d] animate-ring">
                                <LocationIcon width="24px" height="24px" />
                            </span>
                        </div>
                        <div>
                            <h2 className="">
                                You are at {currentPosition.city}?
                            </h2>
                            <p
                                className="text-text hover:underline"
                                onClick={handleSetCurrentWeather}
                            >
                                Click to use this location
                            </p>
                        </div>
                        <div className="ml-3">
                            <span
                                className=""
                                onClick={() => setShowToast(false)}
                            >
                                <TimesIcon width="20px" height="20px" />
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default RecommendPosition;
