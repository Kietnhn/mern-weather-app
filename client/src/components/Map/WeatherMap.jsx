import React, { useContext, useState } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Controls from "./Controls";
import ResetLocation from "./ResetLocation";
import MarkerMap from "./MarkerMap";
import InfoMap from "./InfoMap";
import { PositionContext } from "../../contexts/PositionContext";
const WeatherMap = ({ isUseCurrentPosition = false }) => {
    const {
        weatherState: { weatherData },
    } = useContext(WeatherContext);
    const {
        positionState: { currentPosition },
    } = useContext(PositionContext);
    const [weatherOnMap, setWeatherOnMap] = useState(() => {
        if (isUseCurrentPosition) {
            const lat = currentPosition.latitude;
            const lon = currentPosition.longitude;
            return { lat, lon };
        } else {
            return { ...weatherData };
        }
    });
    const [map, setMap] = useState(null);
    return (
        <div className="relative h-full">
            <MapContainer
                className="markercluster-map h-full p-3"
                center={[weatherOnMap.lat, weatherOnMap.lon]}
                zoom={10}
                zoomControl={true}
                scrollWheelZoom={true}
                ref={setMap}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {!isUseCurrentPosition && <Controls />}
                <MarkerMap
                    setWeatherOnMap={setWeatherOnMap}
                    lat={weatherOnMap.lat}
                    lon={weatherOnMap.lon}
                />
            </MapContainer>
            {map && (
                <ResetLocation
                    setWeatherOnMap={setWeatherOnMap}
                    map={map}
                    center={[weatherOnMap.lat, weatherOnMap.lon]}
                    zoom={10}
                    className="absolute right-2.5 bottom-2.5 z-[999]"
                />
            )}
            {!isUseCurrentPosition && map && (
                <InfoMap
                    setWeatherOnMap={setWeatherOnMap}
                    timezone={weatherData.timezone}
                    map={map}
                    weather={weatherOnMap}
                    className="absolute bottom-2.5 left-2.5 z-[999]"
                />
            )}
        </div>
    );
};

export default WeatherMap;
