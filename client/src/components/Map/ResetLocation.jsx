import React, { useCallback, useContext } from "react";
import { PositionContext } from "../../contexts/PositionContext";
import ToolTip from "../ToolTip";
import { MarkerIcon, ReCenterIcon } from "../icons";
const ResetLocation = ({ map, center, zoom, className }) => {
    const {
        setAreaOnMap,
        positionState: { areaOnMap },
    } = useContext(PositionContext);
    const onClick = useCallback(() => {
        setAreaOnMap("");
        map.setView(center, zoom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);
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
