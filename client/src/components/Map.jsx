import { forwardRef } from "react";
import WeatherMap from "./Map/WeatherMap";
import Wrapper from "./Wrapper";
const Map = forwardRef((_, ref) => {
    return (
        <Wrapper title="Weather Map" id="weathermap" ref={ref}>
            <div className="h-[70vh]">
                <WeatherMap />
            </div>
        </Wrapper>
    );
});
export default Map;
