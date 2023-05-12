import { WeatherContext } from "../contexts/WeatherContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import data from "../utils/defaultCityData";

const CitiesLanding = () => {
    const { getWeatherData } = useContext(WeatherContext);

    const navigate = useNavigate();
    const handleSelectPosition = async ({ lat, lon }) => {
        await getWeatherData({ lat, lon });
        navigate("/today");
    };
    return (
        <div className="">
            <h1 className=" text-2xl font-semibold text-[white]">
                Famoust Cities
            </h1>
            <div className="flex flex-wrap -mx-2 mt-4  ">
                {data.map((item, index) => (
                    <div
                        className={`px-2 mb-4 w-1/5 hover:cursor-pointer`}
                        key={`${index} city`}
                        onClick={() => handleSelectPosition(item)}
                    >
                        <div className="flex items-center justify-center relative h-full">
                            <div className="w-[127px] h-[127px] lg:w-full lg:h-[300px] brightness-75 hover:brightness-90 rounded-[12px]  overflow-hidden">
                                <img
                                    src={item.weather.imgUrl}
                                    alt={`${item.weather.name}-img`}
                                    className="w-full h-full object-cover "
                                />
                            </div>
                            <h3 className="absolute bottom-2 left-3 text-base font-semibold text-primaryText uppercase">
                                {item.weather.name} - {item.weather.country}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CitiesLanding;
