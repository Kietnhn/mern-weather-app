import AirPollution from "../../components/AirPollution/AirPollution";
import Navigation from "./Navigation";
import Cities from "./Cities";
import { MainView, Sunview, Map } from "../../components";
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
