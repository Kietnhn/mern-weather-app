import { useContext, useEffect } from "react";
import { AirContext } from "../../../contexts/AirContext";
import AirChart from "./AirChart";
const Forecast = ({ lat, lon, timezone }) => {
    const {
        airState: { forecast },
        getForecastAirPollution,
    } = useContext(AirContext);

    useEffect(() => {
        if (!forecast) {
            console.log("fetch forecast");
            getForecastAirPollution({ lat, lon });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forecast]);
    if (forecast) console.log({ forecast });
    return (
        <div>
            <h1>Forecast Air Pollution</h1>
            <div>
                {forecast && (
                    <AirChart list={forecast.list} timezone={timezone} />
                )}
            </div>
        </div>
    );
};
export default Forecast;
