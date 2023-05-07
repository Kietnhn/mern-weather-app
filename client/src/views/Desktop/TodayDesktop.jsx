import Map from "./Map";
import MainView from "./MainView";
import AirPollution from "./AirPollution/AirPollution";
import Sunview from "./Sunview";
import Contact from "../Contact/Contact";
import Navigation from "./Navigation";
import Cities from "./Cities";
// import { Fade } from "react-awesome-reveal";
const TodayDesktop = () => {
    return (
        <>
            <Cities />

            <Navigation />
            <MainView />
            <AirPollution />
            <Sunview />
            <Map />
            <Contact />
        </>
    );
};

export default TodayDesktop;
