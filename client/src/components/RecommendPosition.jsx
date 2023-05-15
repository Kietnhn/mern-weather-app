import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import { useNavigate } from "react-router-dom";
// import { LocationIcon, TimesIcon } from "./icons";
import { PositionContext } from "../contexts/PositionContext";
import Toast from "./Toast";
const RecommendPosition = () => {
    const { getWeatherData } = useContext(WeatherContext);
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
                <Toast
                    onClose={() => setShowToast(false)}
                    onClick={handleSetCurrentWeather}
                    content={
                        <>
                            <h2 className="">
                                You are at {currentPosition.city}?
                            </h2>
                            <p className="text-text hover:underline">
                                Click to use this location
                            </p>
                        </>
                    }
                />
            )}
        </>
    );
};
export default RecommendPosition;
