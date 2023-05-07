import {
    UVIcon,
    PressureIcon,
    EyeIcon,
    DropletIcon,
    WindIcon,
    TemperatureIcon,
} from "../components/icons";
const viewInfoData = [
    {
        name: "uvi",
        unit: "",
        icon: UVIcon,
    },
    {
        name: "wind_deg",
        unit: "\u00B0",
        icon: TemperatureIcon,
    },
    {
        name: "wind_speed",
        unit: "m/s",
        icon: WindIcon,
    },
    {
        name: "humidity",
        unit: "%",
        icon: DropletIcon,
    },
    {
        name: "pressure",
        unit: "hPa",
        icon: PressureIcon,
    },
    {
        name: "visibility",
        unit: "ms",
        icon: EyeIcon,
    },
];

export default viewInfoData;
