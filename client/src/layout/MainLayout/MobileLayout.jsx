import React, { useContext } from "react";
import SaveButton from "../../components/SaveButton";
import { Theme } from "../../components/Theme";
import { WeatherContext } from "../../contexts/WeatherContext";
import Navigation from "../../views/Mobile/Navigation";
import Header from "../../views/Mobile/Header";
const MobileLayout = ({ children }) => {
    const {
        weatherState: {
            weatherData: { timezone },
        },
    } = useContext(WeatherContext);
    return (
        <>
            <Header />
            <div className="fixed right-3 top-20  z-[49]">
                <Theme />
            </div>
            <Navigation />
            <div className="w-full bg-slate-400 my-4 relative z-20 lg:hidden">
                <div className="relative z-10 flex items-center mt-10">
                    <h3 className="text-2xl font-semibold mr-2 ">
                        {timezone ? timezone : "Current Location"}
                    </h3>
                    <SaveButton></SaveButton>
                </div>
                {children}
            </div>
        </>
    );
};

export default MobileLayout;
