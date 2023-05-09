import Map from "./Map";
import MainView from "./MainView";
import AirPollution from "./AirPollution/AirPollution";
import Sunview from "./Sunview";
import Navigation from "./Navigation";
import Cities from "./Cities";
import Footer from "../Footer/Footer";
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
            <Footer />
        </>
    );
};

export default TodayDesktop;
