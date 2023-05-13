import AirPollution from "../components/AirPollution/AirPollution";
import { Map, Sunview } from "../components";
import Footer from "../views/Footer/Footer";
import ChartPage from "../pages/ChartPage";
import { City, Login, Next7Day, Register } from "../pages";
import MainLayout from "../layout/MainLayout/MainLayout";

const mobileRoutes = [
    {
        path: "/chart-page",
        layout: MainLayout,
        element: ChartPage,
    },

    {
        path: "/my-city",
        layout: MainLayout,

        element: City,
    },
    {
        path: "/login",
        layout: null,

        element: Login,
    },
    {
        path: "/register",
        layout: null,

        element: Register,
    },
    {
        path: "/next7Day",
        layout: MainLayout,

        element: Next7Day,
    },
    {
        path: "/air-pollution",
        layout: MainLayout,

        element: AirPollution,
    },
    {
        path: "/sun-moon",
        layout: MainLayout,

        element: Sunview,
    },
    {
        path: "/weather-map",
        layout: MainLayout,

        element: Map,
    },
    {
        path: "/get-in-touch",
        layout: MainLayout,

        element: Footer,
    },
];
export default mobileRoutes;
