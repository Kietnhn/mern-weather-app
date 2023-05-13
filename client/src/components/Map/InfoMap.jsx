import { useState, useContext, useEffect } from "react";
import { PositionContext } from "../../contexts/PositionContext";
import SearchMap from "../../views/Search/SearchMap";
import { WeatherContext } from "../../contexts/WeatherContext";
import scrollToComponent from "../../utils/scrollToComponent";
import { ExpendBoxIcon, MiniSize } from "../icons";
import ToolTip from "../ToolTip";
import convertCelsiusToFahrenheit from "../../utils/convertCelsiusToFahrenheit";
import { SettingsContext } from "../../contexts/SettingsContext";
const InfoMap = ({ weather, map, className, timezone, setWeatherOnMap }) => {
    const {
        positionState: { areaOnMap },
    } = useContext(PositionContext);
    const { getWeatherData } = useContext(WeatherContext);
    const {
        settingsState: { units },
    } = useContext(SettingsContext);
    const [position] = useState(map.getCenter());
    const [alert, setAlert] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [baseLayer, setBaseLayer] = useState("Temperature");
    const [customLatLon] = useState([
        { name: "latitude", att: "lat" },
        { name: "longitude", att: "lon" },
    ]);
    const [customBaseLayer] = useState({
        Temperature: {
            attr: "temp",
            unit: "\u00B0",
        },
        Wind: {
            attr: "wind_speed",
            unit: "m/s",
        },
        Pressure: {
            attr: "pressure",
            unit: "hPa",
        },
        Clouds: {
            attr: "clouds",
            unit: "%",
        },
    });
    const handleChangePosition = async () => {
        const { lat, lon } = weather;
        await getWeatherData({ lat, lon });
        setAlert(false);
        scrollToComponent("#mainview");
        document.querySelector(".mainview").classList.toggle("text-theme");
        document.querySelector(".weathermap").classList.toggle("text-theme");
    };
    const handleShowAlert = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 3000);
    };
    useEffect(() => {
        map.on("baselayerchange", (e) => {
            setBaseLayer(e.name);
        });
    }, [map]);
    return (
        <div className={className}>
            {isShow ? (
                <>
                    <div className="p-3 theme modal-content">
                        <div className="between justify-end mb-2">
                            <ToolTip
                                message="View info map"
                                position="-top-full left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <button
                                    className="button p-2"
                                    onClick={() => setIsShow(false)}
                                >
                                    <span>
                                        <MiniSize width="20px" height="20px" />
                                    </span>
                                </button>
                            </ToolTip>
                        </div>
                        <SearchMap
                            map={map}
                            zoom={10}
                            setWeatherOnMap={setWeatherOnMap}
                        />
                        <div className=" font-bold mb-2 flex items-center gap-2">
                            <span className="text-lg text-text">
                                {" "}
                                Marker at:
                            </span>
                            <h1 className="text-xl">
                                {areaOnMap
                                    ? `${areaOnMap.country}-${areaOnMap.name}`
                                    : timezone}
                            </h1>
                        </div>
                        <div className=" items-start between font-semibold mb-2">
                            {customLatLon.map((item) => (
                                <h3 className="capitalize" key={item.name}>
                                    {item.name}:
                                    <span>
                                        {areaOnMap
                                            ? areaOnMap[item.att].toFixed(1)
                                            : item.att === "lon"
                                            ? position["lng"].toFixed(1)
                                            : position[item.att].toFixed(1)}
                                    </span>
                                </h3>
                            ))}
                        </div>
                        <div className="info font-semibold mb-2">
                            <h2 className="text-xl">{baseLayer}</h2>
                            <h2
                                className={`text-6xl ${
                                    baseLayer === "Temperature" ? "flex" : ""
                                }`}
                            >
                                {baseLayer === "Temperature"
                                    ? convertCelsiusToFahrenheit(
                                          weather?.currentWeather[
                                              customBaseLayer[baseLayer].attr
                                          ],
                                          units !== "metric"
                                      )
                                    : weather?.currentWeather[
                                          customBaseLayer[baseLayer].attr
                                      ]}
                                <span className="text-4xl text-text">
                                    {customBaseLayer[baseLayer].unit}
                                </span>
                            </h2>
                        </div>
                        <div>
                            <button
                                className="button w-full"
                                onClick={handleShowAlert}
                            >
                                View more
                            </button>
                        </div>
                    </div>
                    {alert && (
                        <div
                            className="fixed inset-0 z-[9999]"
                            onClick={(e) => {
                                e.stopPropagation();
                                setAlert(false);
                            }}
                        >
                            <div
                                className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="theme modal-content p-3 font-semibold">
                                    <p className="text-xl mb-3">
                                        This will change your current Position!
                                    </p>
                                    <div className="between -mx-3">
                                        <div className="w-1/2 px-3">
                                            <button
                                                className="w-full button"
                                                onClick={() => setAlert(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        <div className="w-1/2 px-3">
                                            <button
                                                className="w-full button-reverse"
                                                onClick={handleChangePosition}
                                            >
                                                Use this Position
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <ToolTip
                    message="View info map"
                    position="-top-full left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <button
                        className="button p-2"
                        onClick={() => setIsShow(true)}
                    >
                        <span>
                            <ExpendBoxIcon width="20px" height="20px" />
                        </span>
                    </button>
                </ToolTip>
            )}
        </div>
    );
};
export default InfoMap;
