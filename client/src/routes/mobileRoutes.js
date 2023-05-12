import AirPollution from "../components/AirPollution/AirPollution";
import { Map, Sunview } from "../components";
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
