import React, { useState, useMemo, useRef, useContext, useEffect } from "react";
import L from "leaflet";
import markerIconUrl from "../../assets/img/marker-icon.png";
import { Marker } from "react-leaflet";
import { PositionContext } from "../../contexts/PositionContext";
import { WeatherContext } from "../../contexts/WeatherContext";
const MarkerMap = ({ lat, lon, setWeatherOnMap }) => {
    const markerIcon = new L.Icon({
        iconUrl: markerIconUrl,
    });
    const {
        getPositionByLatLon,
        setAreaOnMap,
        positionState: { areaOnMap },
    } = useContext(PositionContext);
    const { getCurrentWeatherData } = useContext(WeatherContext);
    const [position, setPosition] = useState([lat, lon]);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const { lat, lng } = marker.getLatLng();
                    handleGetPositionByLatLon({ lat, lon: lng });
                    handleGetCurrentWeatherData({ lat, lon });
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
        } else {
            setPosition([areaOnMap.lat, areaOnMap.lon]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [areaOnMap]);

    const handleGetPositionByLatLon = async ({ lat, lon }) => {
        const position = await getPositionByLatLon({ lat, lon });
        setAreaOnMap(position);
    };
    const handleGetCurrentWeatherData = async ({ lat, lon }) => {
        const currentWeatherData = await getCurrentWeatherData({ lat, lon });
        setWeatherOnMap(currentWeatherData);
    };

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={markerIcon}
        ></Marker>
    );
};

export default MarkerMap;
