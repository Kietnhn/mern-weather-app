import Search from "../components/Search/Search";
import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import { set2xIconUrl } from "../utils/setIconUrl";
function Aside() {
    const {
        weatherState: { currentWeather },
    } = useContext(WeatherContext);
    return (
        <>
            <div className="w-[30%] bg-white p-[40px]">
                <Search />
                <div className="my-[30px] pb-[30px] border-b-[1px] border-gray-400">
                    <div>
                        {currentWeather?.weather?.length > 0 && (
                            <img
                                src={set2xIconUrl(
                                    currentWeather?.weather[0]?.icon
                                )}
                                alt="icon"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div className="tempC">
                        <h2>{currentWeather?.main?.temp}</h2>
                    </div>
                    <div className="text-xl">
                        <span>Monday,</span>
                        <span className="text-slate-500">16:00</span>
                    </div>
                </div>
                <div>
                    {currentWeather?.weather?.length > 0 && (
                        <h3 className="capitalize">
                            {currentWeather.weather[0].description}
                        </h3>
                    )}
                </div>
            </div>
        </>
    );
}

export default Aside;
