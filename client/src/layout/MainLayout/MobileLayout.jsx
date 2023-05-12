import React, { useContext } from "react";
import SaveButton from "../../components/Button/SaveButton";
import { Theme } from "../../components/Theme";
import { WeatherContext } from "../../contexts/WeatherContext";
// import Navigation from "../../views/Mobile/Navigation";
import Header from "../../views/Mobile/Header";
import { useLocation } from "react-router-dom";
const MobileLayout = ({ children }) => {
    const {
        weatherState: {
            weatherData: { timezone },
        },
    } = useContext(WeatherContext);
    const location = useLocation();
    return (
        <>
            <Header />
            <div className="fixed right-3 top-20  z-[49]">
                <Theme />
            </div>
            {/* <Navigation /> */}
            <div className="w-full  relative z-20 lg:hidden">
                {location.pathname !== "/get-in-touch" && (
                    <div className="relative my-4 z-10 flex items-center mt-10">
                        <h3 className="text-2xl font-semibold mr-2 ">
                            {timezone ? timezone : "Current Location"}
                        </h3>
                        <SaveButton></SaveButton>
                    </div>
                )}
                {children}
            </div>
        </>
    );
};

export default MobileLayout;
