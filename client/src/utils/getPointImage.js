import moment from "moment-timezone";

const getPointImage = ({ weather, timezone }) => {
    const SUN_URL = "https://cdn-icons-png.flaticon.com/512/169/169367.png";
    const MOON_URL = "https://cdn-icons-png.flaticon.com/512/1823/1823324.png";
    const image = new Image();
    image.width = 28;
    image.height = 28;
    const current = moment.unix(weather.dt).tz(timezone).format("HH");
    const sunrise = moment.unix(weather.sunrise).tz(timezone).format("HH");
    const sunset = moment.unix(weather.sunset).tz(timezone).format("HH");
    if (current >= sunrise && current <= sunset) {
        image.src = SUN_URL;
    } else {
        image.src = MOON_URL;
    }
    return image;
};
export default getPointImage;
