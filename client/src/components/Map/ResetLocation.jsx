import React, { useCallback, useContext } from "react";
import { PositionContext } from "../../contexts/PositionContext";
import ToolTip from "../ToolTip";
import { MarkerIcon, ReCenterIcon } from "../icons";
import { WeatherContext } from "../../contexts/WeatherContext";
import { useEffect } from "react";
const ResetLocation = ({ map, center, zoom, className, setWeatherOnMap }) => {
    const {
        setAreaOnMap,
        positionState: { areaOnMap },
    } = useContext(PositionContext);
    const {
        weatherState: { weatherData },
    } = useContext(WeatherContext);
    const onClick = useCallback(() => {
        setAreaOnMap("");
        setWeatherOnMap(weatherData);

        map.setView(center, zoom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, map, zoom]);
    const handleReCenter = () => {
        const { lat, lon } = areaOnMap;
        map.setView([lat, lon], zoom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    return (
        <div className={className}>
            <div className="mb-4">
                {areaOnMap && (
                    <ToolTip message="re-center">
                        <button
                            onClick={handleReCenter}
                            className="p-2.5 rounded-full theme"
                        >
                            <span>
                                <ReCenterIcon width="20px" height="20px" />
                            </span>
                        </button>
                    </ToolTip>
                )}
            </div>
            <ToolTip message={areaOnMap ? "reset" : "re-center"}>
                <button onClick={onClick} className="p-2.5 rounded-full theme">
                    <span>
                        {areaOnMap ? (
                            <MarkerIcon width="20px" height="20px" />
                        ) : (
                            <ReCenterIcon width="20px" height="20px" />
                        )}
                    </span>
                </button>
            </ToolTip>
        </div>
    );
};

export default ResetLocation;
