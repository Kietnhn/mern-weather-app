import { WeatherContext } from "../../contexts/WeatherContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import LoadingPage from "../../components/Loading/LoadingPage";
// import Footer from "../../views/Footer/Footer";
function MainLayout({ children }) {
    const {
        weatherState: { isLoading, weatherData },
    } = useContext(WeatherContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!weatherData) return navigate("/landing");
    }, [weatherData, navigate]);
    console.log({ weatherData });
    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : weatherData ? (
                window.innerWidth > 992 ? (
                    <DesktopLayout>{children}</DesktopLayout>
                ) : (
                    <div className="theme p-6 h-screen lg:brightness-100 brightness-[0.95] duration-200 lg:w-[unset] lg:h-[unset] lg:p-0">
                        <MobileLayout>{children}</MobileLayout>
                    </div>
                )
            ) : (
                <></>
            )}
        </>
    );
}

export default MainLayout;
