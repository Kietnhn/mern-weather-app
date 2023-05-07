import { useState, useContext, useEffect } from "react";
import { PositionContext } from "../../contexts/PositionContext";
const InfoMap = ({ weather, map, className, timezone }) => {
    const {
        positionState: { areaOnMap },
    } = useContext(PositionContext);
    const [position] = useState(map.getCenter());
    const [search, setSearch] = useState("");
    const [alert, setAlert] = useState(false);
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
    const handleChangePosition = () => {
        console.log("change");
    };
    useEffect(() => {
        map.on("baselayerchange", (e) => {
            setBaseLayer(e.name);
        });
    }, [map]);
    return (
        <div className={className}>
            <div className="p-3">
                <div>
                    <input
                        className="py-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
                <div className=" font-bold mb-2 flex items-center gap-2">
                    <span className="text-lg text-text"> Marker at:</span>
                    <h1 className="text-xl">
                        {areaOnMap
                            ? `${areaOnMap.name}-${areaOnMap.country}`
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
                    <h2 className="text-6xl">
                        {weather[customBaseLayer[baseLayer].attr]}
                        {customBaseLayer[baseLayer].unit}
                    </h2>
                </div>
                <div>
                    <button className="button" onClick={() => setAlert(true)}>
                        View more
                    </button>
                </div>
            </div>
            {alert && (
                <div className="fixed inset-0">
                    <div className="absolute theme top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                        <p>This will change your current Position!</p>
                        <div className="between">
                            <button onClick={() => setAlert(false)}>
                                Cancel
                            </button>
                            <button onClick={handleChangePosition}>
                                Use this Position
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default InfoMap;
