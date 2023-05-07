import rain from "../assets/gif/rain.gif";
import rainShower from "../assets/gif/rain2.gif";
import night from "../assets/gif/night.gif";
import sun from "../assets/gif/sun.gif";
import storm from "../assets/gif/storm.gif";
import snow from "../assets/gif/snow.gif";
import mistNight from "../assets/gif/mist-night.gif";
import mist from "../assets/gif/mist.gif";
import cloud from "../assets/gif/sunset2.gif";
import cloudNight from "../assets/gif/sunset3.gif";
import scatteredClouds from "../assets/gif/scattered-clouds.gif";
import brokenClouds from "../assets/gif/broken-clouds.gif";
import defaultImg from "../assets/gif/default.jpg";
const convertToBackground = (id) => {
    switch (id) {
        case "01d":
            return sun;
        case "01n":
            return night;
        case "02d":
            return cloud;
        case "02n":
            return cloudNight;
        case "03d":
        case "03n":
            return scatteredClouds;
        case "04d":
        case "04n":
            return brokenClouds;
        case "09d":
        case "09n":
            return rainShower;
        case "10d":
        case "10n":
            return rain;
        case "11d":
        case "11n":
            return storm;
        case "13d":
        case "13n":
            return snow;
        case "50d":
            return mist;
        case "50n":
            return mistNight;
        default:
            return defaultImg;
    }
};
export default convertToBackground;
