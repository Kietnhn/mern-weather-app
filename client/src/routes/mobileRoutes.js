import AirPollution from "../components/AirPollution/AirPollution";
import { Map, Sunview } from "../components";
import Footer from "../views/Footer/Footer";
import ChartPage from "../pages/ChartPage";
import { City } from "../pages";

const mobileRoutes = [
    {
        path: "/chart-page",
        element: ChartPage,
    },

    {
        path: "/my-city",
        element: City,
    },
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
