import {
    UVIcon,
    PressureIcon,
    EyeIcon,
    DropletIcon,
    WindIcon,
    TemperatureIcon,
    TemperatureWindIcon,
    DewPointIcon,
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
        icon: TemperatureWindIcon,
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

export const viewInFoDataMobile = [
    {
        name: "feels_like",
        unit: "\u00B0",
        icon: TemperatureIcon,
    },
    {
        name: "dew_point",
        unit: "\u00B0",
        icon: DewPointIcon,
    },
    ...viewInfoData,
];
export default viewInfoData;
