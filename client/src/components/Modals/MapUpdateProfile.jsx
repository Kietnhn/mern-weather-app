import React, { useContext, useMemo, useRef, useState } from "react";
import markerIconUrl from "../../assets/img/marker-icon.png";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { PositionContext } from "../../contexts/PositionContext";
import ResetLocation from "../Map/ResetLocation";
import L from "leaflet";

const MapUpdateProfile = ({ setPositionOnMap, positionOnMap }) => {
    const {
        getPositionByLatLon,
        positionState: { currentPosition },
    } = useContext(PositionContext);
    const [map, setMap] = useState(null);
    const [position, setPosition] = useState([
        currentPosition.latitude,
        currentPosition.longitude,
    ]);
    const markerIcon = new L.Icon({
        iconUrl: markerIconUrl,
    });
    const markerRef = useRef();
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const { lat, lng } = marker.getLatLng();
                    handleGetPositionByLatLon({ lat, lon: lng });
                }
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    const handleGetPositionByLatLon = async ({ lat, lon }) => {
        const newPosition = await getPositionByLatLon({ lat, lon });
        setPosition(newPosition);
        setPositionOnMap(newPosition);
    };

    return (
        <div className="h-full relative">
            <MapContainer
                className="markercluster-map h-full p-3"
                center={position}
                zoom={10}
                zoomControl={true}
                scrollWheelZoom={true}
                ref={setMap}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    draggable={true}
                    eventHandlers={eventHandlers}
                    position={position}
                    ref={markerRef}
                    icon={markerIcon}
                />
            </MapContainer>
            <div
                className="absolute bottom-3 left-3 z-[999] theme-reverse "
                style={{ backgroundColor: "transparent" }}
            >
                <h2 className="text-2xl font-bold text-black bg-transparent ">
                    {positionOnMap
                        ? `${positionOnMap?.country} - ${positionOnMap?.name}`
                        : `${currentPosition.countryCode} - ${currentPosition.city}`}
                </h2>
            </div>
            {map && (
                <ResetLocation
                    setWeatherOnMap={() => {}}
                    map={map}
                    center={position}
                    zoom={10}
                    className="absolute right-2.5 bottom-2.5 z-[999]"
                />
            )}
        </div>
    );
};

export default MapUpdateProfile;
