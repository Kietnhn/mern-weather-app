import WeatherMap from "../../components/Map/WeatherMap";
import Wrapper from "../../components/Wrapper";
const Map = () => {
    return (
        <Wrapper title="Weather Map" theme="theme" id="weathermap">
            <div className="h-[70vh]">
                <WeatherMap />
            </div>
        </Wrapper>
    );
};
export default Map;
