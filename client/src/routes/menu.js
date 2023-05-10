import { AboutUsIcon, CityIcon, HomeIcon, SettingIcon, ToolIcon } from "../components/icons";

const menu = [
    {
        title: "Home",
        icon: HomeIcon,
        to: "/",
        isPublic: true,
    },
    {
        title: "My City",
        icon: CityIcon,
        to: "/my-city",
        isPublic: false,
    },
    {
        title: "About Us",
        icon: AboutUsIcon,
        to: null,
        isPublic: true,
    },
    {
        title: "Setting",
        icon: SettingIcon,
        to: null,
        isPublic: true,
    },
    {
        title: "Terms & Conditions",
        icon: ToolIcon,
        to: null,
        isPublic: true,
    },
];
export default menu