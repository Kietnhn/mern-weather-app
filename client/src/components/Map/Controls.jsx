import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";
const Controls = () => {
    return (
        <>
            <LayersControl>
                <LayersControl.BaseLayer checked name="Temperature">
                    <TileLayer
                        url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=3f42f91055039855941408ff9d36e1f1"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </LayersControl.BaseLayer>
                {/* <LayersControl.BaseLayer name="Precipitation">
                    <TileLayer
                        url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=3f42f91055039855941408ff9d36e1f1"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </LayersControl.BaseLayer> */}
                <LayersControl.BaseLayer name="Wind">
                    <TileLayer
                        url="https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=3f42f91055039855941408ff9d36e1f1"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Pressure">
                    <TileLayer
                        url="https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=3f42f91055039855941408ff9d36e1f1"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Clouds">
                    <TileLayer
                        url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=3f42f91055039855941408ff9d36e1f1"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </LayersControl.BaseLayer>
            </LayersControl>
        </>
    );
};

export default Controls;
