import WeatherMap from "./Map/WeatherMap";
import Wrapper from "./Wrapper";
const Map = () => {
    return (
        <Wrapper title="Weather Map" id="weathermap">
            <div className="h-[70vh]">
                <WeatherMap />
            </div>
        </Wrapper>
    );
};
export default Map;
