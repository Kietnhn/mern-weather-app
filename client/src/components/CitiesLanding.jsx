import { WeatherContext } from "../contexts/WeatherContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CityContext } from "../contexts/CityContext";
import setBackgroundGradient from "../utils/setBackgroundGradient";
import data from "../utils/defaultCityData";

const CitiesLanding = () => {
    const { getWeatherData, setCompare } = useContext(WeatherContext);
    const {
        cityState: { cities },
    } = useContext(CityContext);

    const navigate = useNavigate();
    const handleSelectPosition = async ({ lat, lon }) => {
        const weatherData = await getWeatherData({ lat, lon });
        setCompare([{ ...weatherData }]);
        navigate("/today");
    };
    return (
        <div className="flex flex-wrap -mx-2 mt-6 lg:mt-12 lg:fixed lg:bottom-0 lg:overflow-auto lg:max-h-[68vh]">
            {data.map((item, index) => (
                <div
                    className={`px-2 mb-4 w-1/2 ${
                        cities.length < 0 ? "w-1/4" : "lg:w-1/5 lg:h-[160px]"
                    }`}
                    key={`${index} city`}
                    onClick={() => handleSelectPosition(item)}
                >
                    <div className="flex items-center justify-center relative h-full">
                        <div className="w-[127px] h-[127px] lg:w-full lg:h-full brightness-75 hover:brightness-90 rounded-[12px]  overflow-hidden">
                            <img
                                src={item.imgUrl}
                                alt={`${item.name}-img`}
                                className="w-full h-full object-cover "
                            />
                        </div>
                        <h3 className="absolute bottom-2 left-3 text-base font-semibold text-primaryText uppercase">
                            {item.name} - {item.country}
                        </h3>
                    </div>
                </div>
            ))}
            {cities.length > 0 && (
                <>
                    {cities?.map((city) => (
                        <div
                            className="px-2 mb-4 w-1/2 lg:w-1/5 lg:h-[160px]"
                            key={`citylanding is ${city._id}`}
                            onClick={() => handleSelectPosition(city)}
                        >
                            <div className="flex items-center justify-center relative h-full">
                                <div
                                    className={`w-[127px] h-[127px] lg:w-full lg:h-full brightness-75 hover:brightness-90 rounded-[12px]  overflow-hidden ${setBackgroundGradient(
                                        city?.weather?.icon
                                    )} shadow-lg`}
                                ></div>
                                <h3 className="absolute bottom-2 left-3 text-base font-semibold text-primaryText uppercase">
                                    {city?.weather?.name} -{" "}
                                    {city?.weather?.country}
                                </h3>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};
export default CitiesLanding;
