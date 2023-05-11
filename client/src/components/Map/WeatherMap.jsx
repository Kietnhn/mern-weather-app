import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Controls from "./Controls";
import ResetLocation from "./ResetLocation";
import MarkerMap from "./MarkerMap";
import InfoMap from "./InfoMap";
const WeatherMap = () => {
    const {
        weatherState: { weatherData },
    } = useContext(WeatherContext);
    const [weatherOnMap, setWeatherOnMap] = useState({ ...weatherData });
    const [map, setMap] = useState(null);
    useEffect(() => {
        console.log(weatherOnMap);
    }, [weatherOnMap]);
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
                <Controls />
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
            {map && (
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
