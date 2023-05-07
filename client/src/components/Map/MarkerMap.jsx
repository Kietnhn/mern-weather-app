import React, { useState, useMemo, useRef, useContext, useEffect } from "react";
import L from "leaflet";
import markerIconUrl from "../../assets/img/marker-icon.png";
import { Marker } from "react-leaflet";
import { PositionContext } from "../../contexts/PositionContext";
const MarkerMap = ({ weather, lat, lon }) => {
    const markerIcon = new L.Icon({
        iconUrl: markerIconUrl,
    });
    const {
        getPositionByLatLon,
        positionState: { areaOnMap },
    } = useContext(PositionContext);
    // const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState([lat, lon]);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const { lat, lng } = marker.getLatLng();
                    handleGetPositionByLatLon({ lat, lon: lng });
                    setPosition(marker.getLatLng());
                }
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    useEffect(() => {
        if (!areaOnMap) {
            setPosition([lat, lon]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [areaOnMap]);
    const handleGetPositionByLatLon = async ({ lat, lon }) => {
        await getPositionByLatLon({ lat, lon });
    };

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={markerIcon}
        >
            {/* <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? "Marker is draggable"
                        : "Click here to make marker draggable"}
                </span>
            </Popup> */}
        </Marker>
    );
};

// return (
//     <>
//         <Marker position={[lat, lon]} icon={markerIcon}>
//             <Tooltip
//                 className="tooltip"
//                 direction="right"
//                 opacity={1}
//                 permanent
//             >
//                 <div className="tooltip-div">
//                     <p className="temp-tooltip">{weather.temp}&deg;C</p>
//                 </div>
//             </Tooltip>
//             <Popup>
//                 A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//         </Marker>
//     </>
// );
export default MarkerMap;
