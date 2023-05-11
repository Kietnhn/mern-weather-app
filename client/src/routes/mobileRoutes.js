import AirPollution from "../views/Desktop/AirPollution/AirPollution";
import Map from "../views/Desktop/Map";
import Sunview from "../views/Desktop/Sunview";
import Footer from "../views/Footer/Footer";

const mobileRoutes = [
    {
        path: "/air-pollution",
        element: AirPollution,
    },
    {
        path: "/sun-moon",
        element: Sunview,
    },
    {
        path: "/weather-map",
        element: Map,
    },
    {
        path: "/get-in-touch",
        element: Footer,
    },
];
export default mobileRoutes;
