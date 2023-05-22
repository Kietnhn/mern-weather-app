import {
    AboutUsIcon,
    AirPollutionIcon,
    CalendarIcon,
    CityIcon,
    ContactIcon,
    HomeIcon,
    MainViewIcon,
    MapIcon,
    SettingIcon,
    SunMoonIcon,
    ToolIcon,
    WeekIcon,
} from "../components/icons";

const menu = [
    {
        title: "Today",
        icon: HomeIcon,
        to: "/today",
        isPublic: true,
    },
    {
        title: "Week",
        icon: WeekIcon,
        to: "/next7Day",
        isPublic: true,
    },
    {
        title: "Calendar",
        to: "/calendar",
        icon: CalendarIcon,
        isPublic: true,
    },
    {
        title: "Chart",
        icon: MainViewIcon,
        to: "/chart-page",
        isPublic: true,
    },
    {
        title: "Air pollution",
        icon: AirPollutionIcon,
        to: "/air-pollution",
        isPublic: true,
    },
    {
        title: "Sun & Moon",
        icon: SunMoonIcon,
        to: "/sun-moon",
        isPublic: true,
    },
    {
        title: "Weather map",
        icon: MapIcon,
        to: "/weather-map",
        isPublic: true,
    },
    {
        title: "Get in touch",
        icon: ContactIcon,
        to: "/get-in-touch",
        isPublic: true,
    },
    {
        title: "My City",
        icon: CityIcon,
        to: "/my-city",
        isPublic: false,
    },
    // {
    //     title: "About Us",
    //     icon: AboutUsIcon,
    //     to: null,
    //     isPublic: true,
    // },
    {
        title: "Setting",
        icon: SettingIcon,
        to: "/settings",
        isPublic: true,
    },
    // {
    //     title: "Terms & Conditions",
    //     icon: ToolIcon,
    //     to: null,
    //     isPublic: true,
    // },
];
export default menu;
