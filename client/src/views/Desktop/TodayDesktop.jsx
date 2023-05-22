import AirPollution from "../../components/AirPollution/AirPollution";
import Navigation from "./Navigation";
import Cities from "./Cities";
import { MainView, Sunview, Map } from "../../components";
import Footer from "../Footer/Footer";
import useIsInView from "../../hooks/useInView";
import { useRef } from "react";
// import { Fade } from "react-awesome-reveal";
const TodayDesktop = () => {
    const mainViewRef = useRef();
    const airPollutionRef = useRef();
    const sunViewRef = useRef();
    const mapRef = useRef();
    const footerRef = useRef();
    const isMainViewInView = useIsInView(mainViewRef);
    const isAirPollutionInView = useIsInView(airPollutionRef);
    const isSunViewInView = useIsInView(sunViewRef);
    const isMapInView = useIsInView(mapRef);
    const isFooterInView = useIsInView(footerRef);
    return (
        <>
            <div className="sm:hidden md:block">
                <Cities />
            </div>

            <Navigation
                listRef={[
                    isMainViewInView,
                    isAirPollutionInView,
                    isSunViewInView,
                    isMapInView,
                    isFooterInView,
                ]}
            />
            <MainView ref={mainViewRef} />
            <AirPollution ref={airPollutionRef} />
            <Sunview ref={sunViewRef} />
            <Map ref={mapRef} />
            <Footer ref={footerRef} />
        </>
    );
};

export default TodayDesktop;
