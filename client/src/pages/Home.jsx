// import { Theme } from "../components/Theme";
import Homepage from "../assets/img/homepage.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useDetectGeoPermission from "../hooks/useDetectGeoPermission";
import useDetectUserDevice from "../hooks/useDetectUserDevice";
import { PositionContext } from "../contexts/PositionContext";
import { WeatherContext } from "../contexts/WeatherContext";
function Home() {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    const {
        positionState: { currentPosition },
    } = useContext(PositionContext);
    const { getWeatherData } = useContext(WeatherContext);
    const { getLocation } = useDetectGeoPermission();
    const [isMobile] = useDetectUserDevice();
    const navigate = useNavigate();
    useEffect(() => {
        getLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (isMobile && currentPosition) {
            const handleSetCurrentWeather = async () => {
                const lat = currentPosition.latitude;
                const lon = currentPosition.longitude;
                await getWeatherData({ lat, lon });
                navigate("/today");
            };
            handleSetCurrentWeather();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, currentPosition]);
    useEffect(() => {
        if (isAuthenticated && !isMobile) {
            navigate("/landing");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isMobile]);
    return (
        <>
            <div className="w-full h-screen home relative dark:text-white text-black ">
                <div
                    className="absolute inset-0  bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url(${Homepage})` }}
                ></div>

                <div className="text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black-400 p-3 rounded-[24px]">
                    <h1 className="text-6xl font-bold title ">Weather</h1>
                    <h3 className="text-lg font-semibold mt-2 mb-3">
                        Welcome to my website
                    </h3>
                    <div className="">
                        <button className="text-lg font-semibold button rounded-full w-full">
                            <Link to="/landing">Continue</Link>
                        </button>
                    </div>
                </div>
                <p className="absolute bottom-0 left-0 right-0 text-center text-lg">
                    &copy; by Kietnhn <a href="/">Terms & Conditions</a>
                </p>
            </div>
        </>
    );
}
export default Home;
