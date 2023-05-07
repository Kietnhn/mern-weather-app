import { WeatherContext } from "../../contexts/WeatherContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
// import Footer from "../../views/Footer/Footer";
function MainLayout({ children }) {
    const {
        weatherState: {
            isLoading,
            weatherData: { currentWeather },
        },
    } = useContext(WeatherContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && !currentWeather) return navigate("/landing");
    }, [currentWeather, navigate, isLoading]);

    if (!currentWeather) return <></>;
    return (
        <>
            {window.innerWidth > 992 ? (
                <DesktopLayout>{children}</DesktopLayout>
            ) : (
                <div className="theme p-6 h-screen lg:brightness-100 brightness-[0.95] duration-200 lg:w-[unset] lg:h-[unset] lg:p-0">
                    <MobileLayout>{children}</MobileLayout>
                </div>
            )}
            {/* <Footer /> */}
        </>
    );
}

export default MainLayout;
